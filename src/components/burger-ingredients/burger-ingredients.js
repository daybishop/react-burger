import { Component, useState } from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import Modal from '../common/modals'

const burgerIngredientsData = require('../../utils/data.json');

class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = { current: "one" };
    }

    setCurrent = (value) => {
    }

    render() {
        return (
            <div className={styles.tabs}>
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

const GBUElement = ({ item, type }) => {
    const gbu = {

        "calories": (<><span>Калории,</span><span>ккал</span></>),
        "fat": (<><span>Белки,</span><span>г</span></>),
        "proteins": (<><span>Жиры,</span><span>г</span></>),
        "carbohydrates": (<><span>Углеводы,</span><span>г</span></>),
    }
    return (
        <div className={styles.gbu_item}>
            <div>{gbu[type]}</div>
            <span>{item[type]}</span>
        </div>
    )
}

const IngredientDetails = ({ item }) => {
    const gbu = [
        "calories",
        "fat",
        "proteins",
        "carbohydrates",
    ]
    return (

        <div className={styles.modal_content}>

            <img className={styles.item_img} src={item.image_large} />
            <span className={`text text_type_main-medium ${styles.modal_title}`}>{item.name}</span>
            <div className={styles.gbu}>
                {gbu.map((el) => <GBUElement key={el} item={item} type={el} />)}
            </div>
        </div>
    )
}

const Ingredient = ({ item }) => {

    const [showModal, setShowModal] = useState(false);

    const onShowModal = () => setShowModal(true);
    const hideModal = () => setShowModal(false);

    return (
        <>
            <li className={styles.item} onClick={onShowModal}>
                <Counter className={styles.counter} count={1} />
                <img className={styles.item_img} src={item.image} />
                <span className={`text text_type_digits-default ${styles.item_price}`}>
                    {item.price}
                    <CurrencyIcon />
                </span>
                <span className={`text text_type_main-default ${styles.item_title}`}>{item.name}</span>
            </li>
            {
                showModal &&
                <Modal header="Детали ингредиента" handleClose={hideModal}>
                    <IngredientDetails item={item} />
                </Modal>
            }
        </>
    )
}

Ingredient.propTypes = {
    item: PropTypes.object.isRequired,
};

class IngredientsSection extends Component {
    types = {
        main: "Начинка",
        sauce: "Соусы",
        bun: "Булки"
    }
    render() {
        const ingredients = burgerIngredientsData.filter(item => {
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
                                <Ingredient key={item._id} item={item} />
                            )
                        })
                    }
                </ul>
            </section >

        )
    }
}

IngredientsSection.propTypes = {
    type: PropTypes.oneOf(["bun", "sauce", "main"]).isRequired,
};

class BurgerIngredients extends Component {
    render() {
        return (
            <section className={styles.section}>
                <p className="text text_type_main-large pt-10 pb-5">
                    Соберите бургер
                </p>
                <Tabs />
                <div className={styles.scroll_box}>
                    <IngredientsSection type="bun" />
                    <IngredientsSection type="sauce" />
                    <IngredientsSection type="main" />
                </div>
            </section>
        );

    }
}

BurgerIngredients.propTypes = {};

export default BurgerIngredients;