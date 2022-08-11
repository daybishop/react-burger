import { Component } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

import styles from './burger-constructor.module.css';

const burgerIngredientsData = require('../../utils/data.json');


class Order extends Component {
    render() {
        return (
            <div className={styles.total}>
                <div className={styles.total_price}>
                    <span className="text text_type_digits-medium">
                        610
                    </span>
                    <CurrencyIcon />
                </div>

                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        )

    }
}

Order.propTypes = {};

class BurgerElement extends Component {
    render() {
        const ingredient = burgerIngredientsData.find(el => {
            return el._id == this.props.id
        })
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
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["top", "bottom"]),
};

class BurgerConstructor extends Component {

    render() {
        const elements = [
            "60666c42cc7b410027a1a9b5",
            "60666c42cc7b410027a1a9b6",
            "60666c42cc7b410027a1a9b7",
            "60666c42cc7b410027a1a9b4",
            "60666c42cc7b410027a1a9b8",
            "60666c42cc7b410027a1a9bb",
            "60666c42cc7b410027a1a9bd"
        ]
        return (
            <section className={styles.section}>
                <div className={styles.top_and_bottom_element}>
                    <BurgerElement id="60666c42cc7b410027a1a9b1" type="top" />
                </div>
                <div className={styles.elements}>
                    {elements.map(el =>
                        <BurgerElement id={el} key={el} />
                    )}
                </div>
                <div className={styles.top_and_bottom_element}>
                    <BurgerElement id="60666c42cc7b410027a1a9b1" type="bottom" />
                </div>
                <Order />
            </section>
        );

    }
}

BurgerElement.propTypes = {};

export default BurgerConstructor;