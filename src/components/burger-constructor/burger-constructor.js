import { Component } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

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

class BurgerElement extends Component {
    render() {
        const ingredient = burgerIngredientsData.find(el => {
            return el._id == this.props.id
        })
        console.log(ingredient)
        var props = {}
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

class BurgerConstructor extends Component {
    render() {
        return (
            <section className={styles.section}>
                <div className={styles.top_and_bottom_element}>
                    <BurgerElement id="60666c42cc7b410027a1a9b1" type="top" />
                </div>
                <div className={styles.elements}>
                    <BurgerElement id="60666c42cc7b410027a1a9b5" />
                    <BurgerElement id="60666c42cc7b410027a1a9b6" />
                    <BurgerElement id="60666c42cc7b410027a1a9b7" />
                    <BurgerElement id="60666c42cc7b410027a1a9b4" />
                    <BurgerElement id="60666c42cc7b410027a1a9b8" />
                    <BurgerElement id="60666c42cc7b410027a1a9bb" />
                    <BurgerElement id="60666c42cc7b410027a1a9bd" />
                </div>
                <div className={styles.top_and_bottom_element}>
                    <BurgerElement id="60666c42cc7b410027a1a9b1" type="bottom" />
                </div>
                <Order />
            </section>
        );

    }
}

export default BurgerConstructor;