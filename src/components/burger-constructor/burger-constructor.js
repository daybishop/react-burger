import { Component, useState } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon, DragIcon, CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import Modal from '../common/modals'
import { ingredientType } from '../../utils/types'
import styles from './burger-constructor.module.css';

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

class BurgerElement extends Component {
    render() {
        const ingredient = this.props.ingredient;
        let props = {}
        if (ingredient) {
            props = {
                text: ingredient.name,
                price: ingredient.price,
                thumbnail: ingredient.image
            }
            if (ingredient.type === "bun") {
                props.text = `${props.text} ${this.props.type === "top" ? "(верх)" : this.props.type === "bottom" ? "(низ)" : ""}`
                props.isLocked = true;
                props.type = this.props.type;
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
}

BurgerElement.propTypes = {
    ingredient: (ingredientType),
    type: PropTypes.oneOf(["top", "bottom"]),
};

function OrderDetails({ id }) {
    return (
        <div className={styles.modal_content}>
            <span className="text text_type_digits-large">
                {id}
            </span>
            <p className={`text text_type_main-medium ${styles.modal_id_text}`}>
                идентификатор заказа
            </p>
            <div className={styles.modal_order_icon}>
                <CheckMarkIcon />
            </div>
            <p className={`text text_type_main-default ${styles.modal_order_status}`}>
                Ваш заказ начали готовить
            </p>
            <p className={`text text_type_main-default ${styles.modal_wait_info}`}>
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    )
}

OrderDetails.propTypes = {
    id: PropTypes.string.isRequired,
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
                showModal &&
                <Modal handleClose={hideModal}>
                    <OrderDetails id="034536" />
                </Modal>
            }
        </section>
    );
}
BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientType).isRequired,
};