import React, { FC, useRef } from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { TIngredient } from '../../utils/types'
import { setCurrentTab } from '../../services/slices/ingredients';
import { useDrag } from 'react-dnd';
import { addItem, addBun } from '../../services/slices/constructor';
import { Link, useLocation } from 'react-router-dom';
import { constructorSelectors } from '../../services/selectors/constructor';
import { ingredientsSelectors } from '../../services/selectors/ingredients';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

type TTabClickHandle = (e: string) => void
interface ITabs {
    handleTabClick: TTabClickHandle
    refProp: React.LegacyRef<HTMLDivElement>
}
type TSections = 'bun' | 'sauce' | 'main'
const tabNames: { [key in TSections]: string } = {
    bun: 'Булки',
    sauce: 'Соусы',
    main: 'Начинка',
}

const Tabs: FC<ITabs> = ({ handleTabClick, refProp }) => {

    const currentTab = useAppSelector(ingredientsSelectors.currentTab)
    const dispatch = useAppDispatch()

    const onClick = (e: string) => {
        dispatch(setCurrentTab(e))
        handleTabClick(e)
    }

    return (
        <div className={styles.tabs} ref={refProp}>
            {
                Object.keys(tabNames).map((key) => {
                    return (
                        < Tab key={key} value={key} active={currentTab === key} onClick={onClick} >
                            {tabNames[key as TSections]}
                        </Tab>
                    )
                })
            }
        </div >
    )
}

interface IIngredient {
    item: TIngredient
}

const Ingredient: FC<IIngredient> = ({ item }) => {

    let location = useLocation()
    const id = item['_id']
    const dispatch = useAppDispatch()
    const burgerIngredients = useAppSelector(constructorSelectors.items)
    const bun = useAppSelector(constructorSelectors.bun)
    const count: number =
        item.type === 'bun'
            ? item._id === bun?._id
                ? 2
                : 0
            : burgerIngredients.reduce((prev: number, burgerItem: TIngredient) => {
                return prev + (item._id === burgerItem._id ? 1 : 0)
            }, 0)

    const [{ opacity }, dragRef] = useDrag(
        () => ({
            type: 'ingredient',
            item: item,
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0.5 : 1
            }),
            end: (item, monitor) => {
                const dropResult = monitor.getDropResult()
                if (item && dropResult) {
                    dispatch(item.type === 'bun' ? addBun(item) : addItem(item))
                }
            }
        }),
        []
    )
    return (
        <li className={styles.item} ref={dragRef} style={{ opacity }}>
            <Link
                className={styles.link}
                key={id}
                to={{
                    pathname: `/ingredients/${id}`,
                    state: { background: location }
                }}
            >
                {count > 0 && <Counter count={count} />}
                <img className={styles.item_img} src={item.image} alt={item.name} />
                <span className={`text text_type_digits-default ${styles.item_price}`}>
                    {item.price}
                    <CurrencyIcon type='primary' />
                </span>
                <span className={`text text_type_main-default ${styles.item_title}`}>{item.name}</span>
            </Link>
        </li >
    )
}

interface IIngredientSection {
    type: TSections
    refProp: React.RefObject<HTMLElement>
}

const IngredientsSection: FC<IIngredientSection> = ({ type, refProp }) => {

    const ingredientsData: Array<TIngredient> = useAppSelector(ingredientsSelectors.items)

    const ingredients = ingredientsData.filter(item => {
        return item['type'] === type;
    });

    return (
        <section className={styles.section} ref={refProp}>
            {/* Заголовок списка определённого типа */}
            < p id={`ingredient_section_${type}`} className={`text text_type_main-medium pt-10 pb-6 ${styles.section_title}`}>
                {tabNames[type]}
            </p >

            {/* Список ингредиентов */}
            <ul className={styles.items}>
                {
                    ingredients.map(item => {
                        return (
                            <Ingredient key={item._id} item={item} />
                        )
                    })
                }
            </ul>
        </section >
    )
}

export default function BurgerIngredients() {

    const currentTab = useAppSelector(ingredientsSelectors.currentTab)

    const dispatch = useAppDispatch()

    const onTabClick: TTabClickHandle = (e) => {
        document.getElementById(`ingredient_section_${e}`)?.scrollIntoView({ block: "start", behavior: "smooth" })
    }

    interface ISectionDistance {
        [key: string]: number
    }

    const handleScroll = () => {
        const tabsY = refTabs.current?.getBoundingClientRect().y!
        let sectionDistance: ISectionDistance = {}
        for (const key in sectionRefs) {
            const sectionY = sectionRefs[key].current?.getBoundingClientRect().y!
            sectionDistance[key] = Math.abs(sectionY - tabsY)
        }
        const nearestDistance = Math.min(...Object.values(sectionDistance))
        const nearestSection = Object.keys(sectionDistance).find(key => sectionDistance[key] === nearestDistance)
        if (currentTab !== nearestSection) {
            dispatch(setCurrentTab(nearestSection))
        }
    };

    interface ISectionRefs {
        [name: string]: React.RefObject<HTMLElement>
    }

    const sections: Array<TSections> = ['bun', 'sauce', 'main']
    const refTabs = useRef<HTMLDivElement>(null)
    const sectionRefs: ISectionRefs = {
        bun: useRef<HTMLElement>(null),
        sauce: useRef<HTMLElement>(null),
        main: useRef<HTMLElement>(null),
    }

    return (
        <section className={styles.section}>
            <Tabs handleTabClick={onTabClick} refProp={refTabs} />
            <div className={styles.scroll_box} onScroll={handleScroll}>
                {
                    sections.map(el => <IngredientsSection key={el} type={el} refProp={sectionRefs[el]} />)
                }
            </div>
        </section>
    );

}