import { useState } from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import Modal from '../common/modals'
import { ingredientType } from '../../utils/types'
import IngredientDetails from './ingredient-details'

const Tabs = () => {

    const [current, setCurrent] = useState("one");

    return (
        <div className={styles.tabs}>
            <Tab value="one" active={current === "one"} onClick={e => setCurrent(e.value)}>
                Булки
            </Tab>
            <Tab value="two" active={current === "two"} onClick={e => setCurrent(e.value)}>
                Соусы
            </Tab>
            <Tab value="three" active={current === "three"} onClick={e => setCurrent(e.value)}>
                Начинки
            </Tab>
        </div>
    )
}

const Ingredient = ({ item, handleClick }) => {
    return (
        <>
            <li className={styles.item} onClick={e => handleClick(item)}>
                <Counter className={styles.counter} count={1} />
                <img className={styles.item_img} src={item.image} alt={item.name} />
                <span className={`text text_type_digits-default ${styles.item_price}`}>
                    {item.price}
                    <CurrencyIcon />
                </span>
                <span className={`text text_type_main-default ${styles.item_title}`}>{item.name}</span>
            </li>
        </>
    )
}

Ingredient.propTypes = {
    item: ingredientType.isRequired,
    handleClick: PropTypes.func.isRequired,
};

const IngredientsSection = ({ type, data, handleClick }) => {
    const types = {
        main: "Начинка",
        sauce: "Соусы",
        bun: "Булки"
    }
    const ingredients = data.filter(item => {
        return item['type'] === type;
    });

    return (
        <section className={styles.section}>
            {/* Заголовок списка определённого типа */}
            < p className={`text text_type_main-medium pt-10 pb-6 ${styles.section_title}`}>
                {types[type]}
            </p >

            {/* Список ингредиентов */}
            <ul className={styles.items}>
                {
                    ingredients.map(item => {
                        return (
                            <Ingredient key={item._id} item={item} handleClick={handleClick} />
                        )
                    })
                }
            </ul>
        </section >
    )
}

IngredientsSection.propTypes = {
    type: PropTypes.oneOf(["bun", "sauce", "main"]).isRequired,
    data: PropTypes.array.isRequired,
    handleClick: PropTypes.func.isRequired,
};

export default function BurgerIngredients({ data }) {

    const [showModal, setShowModal] = useState(false);
    const [item, setItem] = useState(null);

    const onShowModal = (item) => {
        setShowModal(true);
        setItem(item);
    }
    const hideModal = () => {
        setShowModal(false);
        setItem(null);
    }

    return (
        <section className={styles.section}>
            <p className="text text_type_main-large pt-10 pb-5">
                Соберите бургер
            </p>
            <Tabs />
            <div className={styles.scroll_box}>
                <IngredientsSection data={data} type="bun" handleClick={onShowModal} />
                <IngredientsSection data={data} type="sauce" handleClick={onShowModal} />
                <IngredientsSection data={data} type="main" handleClick={onShowModal} />
            </div>
            <Modal show={showModal} header="Детали ингредиента" handleClose={hideModal}>
                <IngredientDetails item={item} />
            </Modal>
        </section>
    );

}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientType).isRequired,
};
