import { useState } from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import Modal from '../common/modal'
import { ingredientType } from '../../utils/types'
import IngredientDetails from './ingredient-details'
import { useDispatch, useSelector } from 'react-redux';
import * as ingredientsSelectors from '../../services/selectors/ingredients';
import { clearSelectedItem, selectItem } from '../../services/slices/ingredients';
import { useDrag } from 'react-dnd';
import { addItem, addBun } from '../../services/slices/constructor';
import * as constructorSelectors from '../../services/selectors/constructor';

const Tabs = ({ handleTabClick }) => {

    const [current, setCurrent] = useState("bun");

    const onClick = (e) => {
        setCurrent(e)
        handleTabClick(e)
    }

    return (
        <div className={styles.tabs}>
            <Tab value="bun" active={current === "bun"} onClick={onClick}>
                Булки
            </Tab>
            <Tab value="sauce" active={current === "sauce"} onClick={onClick}>
                Соусы
            </Tab>
            <Tab value="main" active={current === "main"} onClick={onClick}>
                Начинки
            </Tab>
        </div>
    )
}

Tabs.propTypes = {
    handleTabClick: PropTypes.func.isRequired,
};

const Ingredient = ({ item, handleClick }) => {

    const dispatch = useDispatch()
    const burgerIngredients = useSelector(constructorSelectors.items)
    const bun = useSelector(constructorSelectors.bun)
    const count =
        item.type === 'bun'
            ? item._id === bun?._id
                ? 2
                : 0
            : burgerIngredients.reduce((prev, burgerItem) => {
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
        <>
            <li className={styles.item} onClick={e => handleClick(item)} ref={dragRef} style={{ opacity }}>
                {count > 0 && <Counter className={styles.counter} count={count} />}
                <img className={styles.item_img} src={item.image} alt={item.name} />
                <span className={`text text_type_digits-default ${styles.item_price}`}>
                    {item.price}
                    <CurrencyIcon />
                </span>
                <span className={`text text_type_main-default ${styles.item_title}`}>{item.name}</span>
            </li>
        </>
    )
}

Ingredient.propTypes = {
    item: ingredientType.isRequired,
    handleClick: PropTypes.func.isRequired,
};

const IngredientsSection = ({ type, handleClick }) => {

    const ingredientsData = useSelector(ingredientsSelectors.items)

    const types = {
        main: "Начинка",
        sauce: "Соусы",
        bun: "Булки"
    }
    const ingredients = ingredientsData.filter(item => {
        return item['type'] === type;
    });

    return (
        <section className={styles.section}>
            {/* Заголовок списка определённого типа */}
            < p id={`ingredient_section_${type}`} className={`text text_type_main-medium pt-10 pb-6 ${styles.section_title}`}>
                {types[type]}
            </p >

            {/* Список ингредиентов */}
            <ul className={styles.items}>
                {
                    ingredients.map(item => {
                        return (
                            <Ingredient key={item._id} item={item} handleClick={handleClick} />
                        )
                    })
                }
            </ul>
        </section >
    )
}

IngredientsSection.propTypes = {
    type: PropTypes.oneOf(["bun", "sauce", "main"]).isRequired,
    handleClick: PropTypes.func.isRequired,
};

export default function BurgerIngredients() {

    const [showModal, setShowModal] = useState(false);
    const selectedItem = useSelector(ingredientsSelectors.selectedItem)

    const dispatch = useDispatch()

    const onShowModal = (item) => {
        setShowModal(true);
        dispatch(selectItem(item))
    }
    const hideModal = () => {
        setShowModal(false);
        dispatch(clearSelectedItem())
    }

    const onTabClick = (e) => {
        document.getElementById(`ingredient_section_${e}`).scrollIntoView({ block: "start", behavior: "smooth" })
    }

    return (
        <section className={styles.section}>
            <p className="text text_type_main-large pt-10 pb-5">
                Соберите бургер
            </p>
            <Tabs handleTabClick={onTabClick} />
            <div className={styles.scroll_box}>
                <IngredientsSection type="bun" handleClick={onShowModal} />
                <IngredientsSection type="sauce" handleClick={onShowModal} />
                <IngredientsSection type="main" handleClick={onShowModal} />
            </div>
            <Modal show={showModal} header="Детали ингредиента" handleClose={hideModal}>
                <IngredientDetails item={selectedItem} />
            </Modal>
        </section>
    );

}