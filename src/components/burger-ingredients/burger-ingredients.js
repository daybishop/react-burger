import { useState, useContext } from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import Modal from '../common/modal'
import { ingredientType } from '../../utils/types'
import IngredientDetails from './ingredient-details'
import { IngredientsDataContext } from '../../services/ingredients-data-context';

const Tabs = ({ handleTabClick }) => {

    const [current, setCurrent] = useState("bun");

    const onClick = (e) => {
        setCurrent(e)
        handleTabClick(e)
    }

    return (
        <div className={styles.tabs}>
            <Tab value="bun" active={current === "bun"} onClick={onClick}>
                Булки
            </Tab>
            <Tab value="sauce" active={current === "sauce"} onClick={onClick}>
                Соусы
            </Tab>
            <Tab value="main" active={current === "main"} onClick={onClick}>
                Начинки
            </Tab>
        </div>
    )
}

Tabs.propTypes = {
    handleTabClick: PropTypes.func.isRequired,
};

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

const IngredientsSection = ({ type, handleClick }) => {

    const ingredientsData = useContext(IngredientsDataContext);

    const types = {
        main: "Начинка",
        sauce: "Соусы",
        bun: "Булки"
    }
    const ingredients = ingredientsData.filter(item => {
        return item['type'] === type;
    });

    return (
        <section className={styles.section}>
            {/* Заголовок списка определённого типа */}
            < p id={`ingredient_section_${type}`} className={`text text_type_main-medium pt-10 pb-6 ${styles.section_title}`}>
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
    handleClick: PropTypes.func.isRequired,
};

export default function BurgerIngredients() {

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

    const onTabClick = (e) => {
        document.getElementById(`ingredient_section_${e}`).scrollIntoView({ block: "start", behavior: "smooth" })
    }

    return (
        <section className={styles.section}>
            <p className="text text_type_main-large pt-10 pb-5">
                Соберите бургер
            </p>
            <Tabs handleTabClick={onTabClick} />
            <div className={styles.scroll_box}>
                <IngredientsSection type="bun" handleClick={onShowModal} />
                <IngredientsSection type="sauce" handleClick={onShowModal} />
                <IngredientsSection type="main" handleClick={onShowModal} />
            </div>
            <Modal show={showModal} header="Детали ингредиента" handleClose={hideModal}>
                <IngredientDetails item={item} />
            </Modal>
        </section>
    );

}