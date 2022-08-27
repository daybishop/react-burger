import { useState, useEffect } from 'react';
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
import * as ingredientsSelectors from '../../services/selectors/ingredients';
import { addBun, addItem, deleteBun, deleteItem, setOrderNumber } from '../../services/slices/constructor';
import * as constructorSelectors from '../../services/selectors/constructor'
import { useDrop } from 'react-dnd';

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

    const onClick = () => {
        if (burgerIngredients.length) {
            fetch(ORDERS, {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ingredients: burgerIngredients
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
    const { name, price, image } = ingredient

    const onClose = () => dispatch(deleteItem(index))

    return (
        ingredient &&
        <div className={styles.element}>
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

    const ingredientsData = useSelector(ingredientsSelectors.items)
    const burgerIngredients = useSelector(constructorSelectors.items)
    const orderNumber = useSelector(constructorSelectors.orderNumber)
    const bun = useSelector(constructorSelectors.bun)

    const [{ canDrop, isOver }, dropRef] = useDrop(() => ({
        accept: 'ingredient',
        drop: () => ({ name: 'Dustbin' }),
        // canDrop: () => burgerIngredients.length >= 2,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))

    const dispatch = useDispatch()

    // useEffect(() => {
    //     const initialData = [
    //         // "60d3b41abdacab0026a733c6",
    //         "60d3b41abdacab0026a733cd",
    //         "60d3b41abdacab0026a733cf",
    //         "60d3b41abdacab0026a733d0",
    //         "60d3b41abdacab0026a733d4",
    //         "60d3b41abdacab0026a733c8",
    //         "60d3b41abdacab0026a733cb",
    //         // "60d3b41abdacab0026a733c6"
    //     ]
    //     dispatch(addBun(GetIngredientById('60d3b41abdacab0026a733c6')))
    //     initialData.map(id => dispatch(addItem(GetIngredientById(id))))
    // }, [dispatch])

    const [showModal, setShowModal] = useState(false);

    const handleOrder = (number) => {
        dispatch(setOrderNumber(number))
        setShowModal(true)
    }

    const handleDelete = id => dispatch(id ? deleteItem(id) : deleteBun())

    const hideModal = () => setShowModal(false)

    const GetIngredientById = (id) => ingredientsData.find(item => item._id === id)

    // const bun = burgerIngredients.length ? GetIngredientById(burgerIngredients[0]) : null

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
                        key={index}
                    // handleDelete={handleDelete}
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