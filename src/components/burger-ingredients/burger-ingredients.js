import { Component } from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';

const burger_ingredients = require('../../utils/data.json');

class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = { current: "one" };
    }

    setCurrent = (value) => {
    }

    render() {
        return (
            <div style={{ display: 'flex' }}>
                <Tab value="one" active={this.state.current === 'one'} onClick={this.setCurrent(this.value)}>
                    Булки
                </Tab>
                <Tab value="two" active={this.state.current === 'two'} onClick={this.setCurrent(this.value)}>
                    Соусы
                </Tab>
                <Tab value="three" active={this.state.current === 'three'} onClick={this.setCurrent(this.value)}>
                    Начинки
                </Tab>
            </div>
        )
    }
}

class Ingredient extends Component {
    render() {
        return (
            <li className={styles.item}>
                <Counter className={styles.counter} count={1} />
                <img className={styles.item_img} src={this.props.item.image} />
                <span className={`text text_type_digits-default ${styles.item_price}`}>
                    {this.props.item.price}
                    <CurrencyIcon />
                </span>
                <span className={`text text_type_main-default ${styles.item_title}`}>{this.props.item.name}</span>
            </li>
        )
    }
}

class IngredientsSection extends Component {
    types = {
        main: "Начинка",
        sauce: "Соусы",
        bun: "Булки"
    }
    render() {
        const ingredients = burger_ingredients.filter(item => {
            return item['type'] === this.props.type;
        });

        return (
            <section className={styles.section}>
                {/* Заголовок списка определённого типа */}
                < p className={`text text_type_main-medium pt-10 pb-6 ${styles.section_title}`}>
                    {this.types[this.props.type]}
                </p >

                {/* Список ингредиентов */}
                <ul className={styles.items}>
                    {
                        ingredients.map(item => {
                            return (
                                <Ingredient item={item} />
                            )
                        })
                    }
                </ul>
            </section >

        )
    }
}

class BurgerIngredients extends Component {
    render() {
        return (
            <section className={styles.section}>
                <p className="text text_type_main-large pt-10 pb-5">
                    Соберите бургер
                </p>
                <Tabs className={styles.tabs} />
                <div className={styles.scroll_box}>
                    <IngredientsSection type="bun" />
                    <IngredientsSection type="sauce" />
                    <IngredientsSection type="main" />
                </div>
            </section>
        );

    }
}

export default BurgerIngredients;