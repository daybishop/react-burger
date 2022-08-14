import { useState } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import Modal from '../common/modals'
import { ingredientType } from '../../utils/types'
import styles from './burger-constructor.module.css';
import OrderDetails from './order-details'

const Order = ({ onClick }) => {
    return (
        <div className={styles.total}>
            <div className={styles.total_price}>
                <span className="text text_type_digits-medium">
                    610
                </span>
                <CurrencyIcon />
            </div>

            <Button type="primary" size="large" onClick={onClick}>
                Оформить заказ
            </Button>
        </div>
    )
}

Order.propTypes = {
    onClick: PropTypes.func,
};

const BurgerElement = ({ ingredient, type }) => {
    let props = {}
    if (ingredient) {
        props = {
            text: ingredient.name,
            price: ingredient.price,
            thumbnail: ingredient.image
        }
        if (ingredient.type === "bun") {
            props.text = `${props.text} ${type === "top" ? "(верх)" : type === "bottom" ? "(низ)" : ""}`
            props.isLocked = true;
            props.type = type;
        }
    }
    return (
        ingredient ?
            <div className={styles.element}>
                {props.isLocked ? "" : <DragIcon />}
                <ConstructorElement
                    {...props}
                />
            </div>
            : ''
    )
}

BurgerElement.propTypes = {
    ingredient: (ingredientType),
    type: PropTypes.oneOf(["top", "bottom"]),
};

export default function BurgerConstructor({ data }) {

    const [showModal, setShowModal] = useState(false);

    const onShowModal = () => setShowModal(true);
    const hideModal = () => setShowModal(false);

    const elements = [
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733cf",
        "60d3b41abdacab0026a733d0",
        "60d3b41abdacab0026a733d4",
        "60d3b41abdacab0026a733c8",
        "60d3b41abdacab0026a733cb"
    ]

    const getIngredientById = id => data.find(item => item._id === id)
    const bun = getIngredientById("60d3b41abdacab0026a733c6")

    return (
        <section className={styles.section}>
            <div className={styles.top_and_bottom_element}>
                <BurgerElement ingredient={bun} type="top" />
            </div>
            <div className={styles.elements}>
                {elements.map(el =>
                    <BurgerElement ingredient={getIngredientById(el)} key={el} />
                )}
            </div>
            <div className={styles.top_and_bottom_element}>
                <BurgerElement ingredient={bun} type="bottom" />
            </div>
            <Order onClick={onShowModal} />
            {
                <Modal show={showModal} handleClose={hideModal}>
                    <OrderDetails id="034536" />
                </Modal>
            }
        </section>
    );
}
BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientType).isRequired,
};