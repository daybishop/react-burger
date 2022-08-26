import { useState, useContext, useEffect } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import Modal from '../common/modal'
import { ingredientType } from '../../utils/types'
import styles from './burger-constructor.module.css';
import OrderDetails from './order-details'
import { IngredientsDataContext } from '../../services/ingredients-data-context';
import { ORDERS } from '../../utils/constants';
import { BurgerIngredientsContext } from '../../services/burger-constructor-context';
import { checkResponse } from '../common/api';

const TotalPrice = () => {

    const ingredientsData = useContext(IngredientsDataContext);
    const burgerIngredients = useContext(BurgerIngredientsContext);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (burgerIngredients) {
            setTotalPrice(
                burgerIngredients.reduce((prev, current) => {
                    const ingredient = ingredientsData.find(item => item._id === current)
                    return prev + (ingredient ? ingredient.price : 0)
                }, 0)
            )
        }
    }, [burgerIngredients, ingredientsData])

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

    const burgerIngredients = useContext(BurgerIngredientsContext);

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

const BurgerElement = ({ ingredient, type, handleDelete, isLocked = false }) => {
    let props = {}
    if (ingredient) {
        props = {
            text: ingredient.name,
            price: ingredient.price,
            thumbnail: ingredient.image,
        }
        if (ingredient.type === "bun") {
            props.text = `${props.text} ${type === "top" ? "(верх)" : type === "bottom" ? "(низ)" : ""}`
            props.isLocked = isLocked;
            props.type = type;
        }
    }

    const onClose = () => handleDelete(ingredient._id)

    return (
        ingredient ?
            <div className={styles.element}>
                {props.isLocked ? "" : <DragIcon />}
                <ConstructorElement
                    {...props}
                    handleClose={onClose}
                />
            </div>
            : ''
    )
}

BurgerElement.propTypes = {
    ingredient: (ingredientType),
    type: PropTypes.oneOf(["top", "bottom"]),
    handleDelete: PropTypes.func.isRequired,
    isLocked: PropTypes.bool
};


export default function BurgerConstructor() {

    const ingredientsData = useContext(IngredientsDataContext);
    const [burgerIngredients, setBurgerIngredients] = useState(
        [
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733cd",
            "60d3b41abdacab0026a733cf",
            "60d3b41abdacab0026a733d0",
            "60d3b41abdacab0026a733d4",
            "60d3b41abdacab0026a733c8",
            "60d3b41abdacab0026a733cb",
            "60d3b41abdacab0026a733c6"
        ]
    );

    const [orderNumber, setOrderNumber] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleOrder = (number) => {
        setOrderNumber(number)
        setShowModal(true)
    }

    const handleDelete = id => setBurgerIngredients(burgerIngredients.filter(el => el !== id))

    const hideModal = () => setShowModal(false)

    const GetIngredientById = (id) => ingredientsData.find(item => item._id === id)

    const bun = burgerIngredients.length ? GetIngredientById(burgerIngredients[0]) : null

    return (
        <section className={styles.section}>
            <div className={styles.top_and_bottom_element}>
                <BurgerElement
                    ingredient={bun}
                    type="top"
                    handleDelete={el => handleDelete(el)}
                    isLocked={burgerIngredients.length > 2}
                />
            </div>
            <div className={styles.elements}>
                {burgerIngredients.slice(1, -1).map(el =>
                    <BurgerElement
                        ingredient={GetIngredientById(el)}
                        key={el}
                        handleDelete={el => handleDelete(el)}
                    />
                )}
            </div>
            <div className={styles.top_and_bottom_element}>
                <BurgerElement
                    ingredient={bun}
                    type="bottom"
                    handleDelete={el => handleDelete(el)}
                    isLocked={burgerIngredients.length > 2}
                />
            </div>

            <BurgerIngredientsContext.Provider value={burgerIngredients}>
                <div className={styles.total}>
                    <TotalPrice />
                    <OrderButton handleClick={handleOrder} />
                </div>
            </BurgerIngredientsContext.Provider>

            <Modal show={showModal} handleClose={hideModal}>
                <OrderDetails id={String(orderNumber)} />
            </Modal>
        </section>
    );
}