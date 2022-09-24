import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ingredientsSelectors } from '../../services/selectors/ingredients';
import { ingredientType } from '../../utils/types'
import styles from './ingredient-details.module.css';

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

GBUElement.propTypes = {
    item: ingredientType.isRequired,
    type: PropTypes.oneOf([
        "calories",
        "fat",
        "proteins",
        "carbohydrates",
    ]).isRequired,
};

export default function IngredientDetails() {

    const items = useSelector(ingredientsSelectors.items)
    const { id } = useParams()
    const item = items.find((item) => item._id === id)

    const gbu = [
        "calories",
        "fat",
        "proteins",
        "carbohydrates",
    ]

    return (
        item
            ? <div className={styles.wrapper}>
                <div className={styles.content}>
                    <img className={styles.image} src={item.image_large} alt={item.name} />
                    <span className={`text text_type_main-medium ${styles.title}`}>{item.name}</span>
                    <div className={styles.gbu_list}>
                        {gbu.map((el) => <GBUElement key={el} item={item} type={el} />)}
                    </div>
                </div>
            </div>
            : null
    )
}
