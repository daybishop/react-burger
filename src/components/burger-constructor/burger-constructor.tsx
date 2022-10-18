import { FC, useRef } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { TBunType, TIngredient, TIngredientWithUUID } from '../../utils/types'
import styles from './burger-constructor.module.css';
import { backup, deleteBun, deleteItem, hideOrder, moveItem, restore, showOrder } from '../../services/slices/constructor';
import { useDrag, useDrop } from 'react-dnd';
import { Link, useHistory } from 'react-router-dom';
import { constructorSelectors } from '../../services/selectors/constructor';
import OrderDetails from './order-details';
import { userSelectors } from '../../services/selectors/user';
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

const TotalPrice = () => {

    const totalPrice = useAppSelector(constructorSelectors.totalPrice)

    return (
        <div className={styles.total_price}>
            <span className="text text_type_digits-medium">
                {totalPrice}
            </span>
            <CurrencyIcon type='primary' />
        </div>
    )
}

const OrderButton = () => {

    const dispatch = useAppDispatch()
    const isLoggedOn = useAppSelector(userSelectors.isLoggedOn)
    const bun = useAppSelector(constructorSelectors.bun)
    const items = useAppSelector(constructorSelectors.items)

    const onClick = () => {
        if (bun && items.length > 0) dispatch(showOrder(''))
    }

    return (
        <Link
            key='key'
            to={{
                pathname: isLoggedOn ? '/' : '/login',
            }}
        >
            <Button type="primary" size="large" onClick={onClick}>
                Оформить заказ
            </Button>
        </Link>
    )
}

interface IBurgerBun {
    ingredient: TIngredient
    type: TBunType
}

const BurgerBun: FC<IBurgerBun> = ({ ingredient, type }) => {

    const dispatch = useAppDispatch()
    const { name, price, image } = ingredient
    const burgerIngredients = useAppSelector(constructorSelectors.items)
    const isLocked = burgerIngredients.length > 0;

    const onClose = () => dispatch(deleteBun(''))

    return (
        ingredient &&
        <div className={styles.element}>
            <ConstructorElement
                text={`${name} ${type === "top" ? "(верх)" : type === "bottom" ? "(низ)" : ""}`}
                price={price}
                thumbnail={image}
                isLocked={isLocked}
                type={type}
                handleClose={onClose}
            />
        </div>
    )
}

interface IBurgerElement {
    ingredient: TIngredientWithUUID
    index: number
}

const BurgerElement: FC<IBurgerElement> = ({ ingredient, index }) => {

    const dispatch = useAppDispatch()
    const { name, price, image, uuid } = ingredient
    const ref = useRef<HTMLInputElement>(null)

    interface IDragItem {
        index: number
    }

    interface ICollectedProps {
        handlerId: any;
    }

    const [{ handlerId }, dropRef] = useDrop<IDragItem, any, ICollectedProps>({
        accept: 'burger_item',
        collect: (monitor) => {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover: (item, monitor) => {
            if (!ref.current) {
                return
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return
            }

            const hoverBoundingRect = ref?.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            dispatch(moveItem({ dragIndex, hoverIndex }))

            item.index = hoverIndex;
        },
    }, [index])

    const [{ opacity }, dragRef] = useDrag<IDragItem, any, { opacity: number }>({
        type: 'burger_item',
        item: { index },
        canDrag: () => {
            dispatch(backup(''))
            return true
        },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.3 : 1
        }),
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if (!dropResult) {
                dispatch(restore(''))
            }
        }
    }, [index])

    dragRef(dropRef(ref))

    const onClose = () => dispatch(deleteItem(uuid))

    return (
        ingredient &&
        <div className={styles.element} style={{ opacity }} ref={ref} data-handler-id={handlerId}>
            <DragIcon type='primary' />
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
                handleClose={onClose}
            />
        </div>
    )
}


export default function BurgerConstructor() {

    const burgerIngredients = useAppSelector(constructorSelectors.items)
    const bun = useAppSelector(constructorSelectors.bun)

    const isLoggedOn = useAppSelector(userSelectors.isLoggedOn)
    const showOrderModal = useAppSelector(constructorSelectors.showOrderModal)

    const history = useHistory()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (history.action === 'PUSH') dispatch(hideOrder(''))
    }, [])

    const [, dropRef] = useDrop(() => ({
        accept: 'ingredient',
    }))

    return (
        <section className={styles.section} ref={dropRef}>
            {
                bun &&
                <div className={styles.top_and_bottom_element}>
                    <BurgerBun
                        ingredient={bun}
                        type="top"
                    />
                </div>
            }
            <div className={styles.elements}>
                {burgerIngredients.map((item: TIngredientWithUUID, index: number) =>
                    <BurgerElement
                        ingredient={item}
                        index={index}
                        key={item.uuid}
                    />
                )}
            </div>
            {
                bun &&
                <div className={styles.top_and_bottom_element}>
                    <BurgerBun
                        ingredient={bun}
                        type="bottom"
                    />
                </div>
            }
            <div className={styles.total}>
                <TotalPrice />
                <OrderButton />
            </div>
            {showOrderModal && isLoggedOn &&
                <OrderDetails />
            }
        </section>
    );
}