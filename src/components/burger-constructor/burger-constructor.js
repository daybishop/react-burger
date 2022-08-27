import { useState, useRef } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import Modal from '../common/modal'
import { ingredientType } from '../../utils/types'
import styles from './burger-constructor.module.css';
import OrderDetails from './order-details'
import { ORDERS } from '../../utils/constants';
import { checkResponse } from '../common/api';
import { useDispatch, useSelector } from 'react-redux';
import { backup, deleteBun, deleteItem, moveItem, restore, setOrderNumber } from '../../services/slices/constructor';
import * as constructorSelectors from '../../services/selectors/constructor'
import { useDrag, useDrop } from 'react-dnd';

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

const OrderButton = ({ handleClick }) => {

    const burgerIngredients = useSelector(constructorSelectors.items)
    const bun = useSelector(constructorSelectors.bun)

    const onClick = () => {
        const order_ids = bun
            ? [bun._id, ...burgerIngredients.map(item => item._id), bun._id]
            : []
        if (burgerIngredients.length) {
            fetch(ORDERS, {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ingredients: order_ids
                })
            })
                .then(res => checkResponse(res))
                .then(data => {
                    if (data.success) {
                        handleClick(data.order.number)
                    } else throw new Error("Error data loading");
                })
                .catch(e => {
                    console.log(e)
                })
        }
    }

    return (
        <Button type="primary" size="large" onClick={onClick}>
            Оформить заказ
        </Button>
    )
}

OrderButton.propTypes = {
    handleClick: PropTypes.func.isRequired,
};

const BurgerBun = ({ ingredient, type }) => {

    const dispatch = useDispatch()
    const { name, price, image } = ingredient
    const isLocked = true;

    const onClose = () => dispatch(deleteBun())

    return (
        ingredient &&
        <div className={styles.element}>
            {!isLocked && <DragIcon />}
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
    const orderNumber = useSelector(constructorSelectors.orderNumber)
    const bun = useSelector(constructorSelectors.bun)

    const [, dropRef] = useDrop(() => ({
        accept: 'ingredient',
    }))

    const dispatch = useDispatch()

    const [showModal, setShowModal] = useState(false);

    const handleOrder = (number) => {
        dispatch(setOrderNumber(number))
        setShowModal(true)
    }

    const hideModal = () => setShowModal(false)
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
                <OrderButton handleClick={handleOrder} />
            </div>

            <Modal show={showModal} handleClose={hideModal}>
                <OrderDetails id={String(orderNumber)} />
            </Modal>
        </section>
    );
}