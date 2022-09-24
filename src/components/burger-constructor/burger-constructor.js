import { useRef } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types'
import styles from './burger-constructor.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { backup, deleteBun, deleteItem, hideOrder, moveItem, restore, showOrder } from '../../services/slices/constructor';
import { useDrag, useDrop } from 'react-dnd';
import { Link, useHistory } from 'react-router-dom';
import { constructorSelectors } from '../../services/selectors/constructor';
import OrderDetails from './order-details';
import { userSelectors } from '../../services/selectors/user';
import { useEffect } from 'react'

const TotalPrice = () => {

    const totalPrice = useSelector(constructorSelectors.totalPrice)

    return (
        <div className={styles.total_price}>
            <span className="text text_type_digits-medium">
                {totalPrice}
            </span>
            <CurrencyIcon />
        </div>
    )
}

const OrderButton = () => {

    const dispatch = useDispatch()
    const isLoggedOn = useSelector(userSelectors.isLoggedOn)
    const bun = useSelector(constructorSelectors.bun)
    const items = useSelector(constructorSelectors.items)

    const onClick = () => {
        if (bun && items.length > 0) dispatch(showOrder())
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

const BurgerBun = ({ ingredient, type }) => {

    const dispatch = useDispatch()
    const { name, price, image } = ingredient
    const burgerIngredients = useSelector(constructorSelectors.items)
    const isLocked = burgerIngredients.length > 0;

    const onClose = () => dispatch(deleteBun())

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

BurgerBun.propTypes = {
    ingredient: (ingredientType),
    type: PropTypes.oneOf(["top", "bottom"]),
};

const BurgerElement = ({ ingredient, index }) => {

    const dispatch = useDispatch()
    const { name, price, image, uuid } = ingredient
    const ref = useRef(null)

    const [{ handlerId }, dropRef] = useDrop(() => ({
        accept: 'burger_item',
        collect(monitor) {
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

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            dispatch(moveItem({ dragIndex, hoverIndex }))

            item.index = hoverIndex;
        },
    }), [index])

    const [{ opacity }, dragRef] = useDrag({
        type: 'burger_item',
        item: { index },
        canDrag: () => {
            dispatch(backup())
            return true
        },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.3 : 1
        }),
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if (!dropResult) {
                dispatch(restore())
            }
        }
    }, [index])

    dragRef(dropRef(ref))

    const onClose = () => dispatch(deleteItem(uuid))

    return (
        ingredient &&
        <div className={styles.element} style={{ opacity }} ref={ref} data-handler-id={handlerId}>
            <DragIcon />
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
                handleClose={onClose}
            />
        </div>
    )
}

BurgerElement.propTypes = {
    ingredient: (ingredientType),
    index: PropTypes.number.isRequired,
};


export default function BurgerConstructor() {

    const burgerIngredients = useSelector(constructorSelectors.items)
    const bun = useSelector(constructorSelectors.bun)

    const isLoggedOn = useSelector(userSelectors.isLoggedOn)
    const showOrderModal = useSelector(constructorSelectors.showOrderModal)

    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        if (history.action === 'PUSH') dispatch(hideOrder())
    }, [])

    const [, dropRef] = useDrop(() => ({
        accept: 'ingredient',
    }))

    const handleMove = (dragIndex, hoverIndex) => {
        dispatch(moveItem({ dragIndex, hoverIndex }))
    }

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
                {burgerIngredients.map((item, index) =>
                    <BurgerElement
                        ingredient={item}
                        index={index}
                        key={item.uuid}
                        handleMove={handleMove}
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