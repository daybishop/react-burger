import { FC } from "react"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { ingredientsSelectors } from "../../services/selectors/ingredients"
import { TFeedOrder, TIngredient } from "../../utils/types"
import { DateTime } from "../datetime/datetime"
import { IngredientCircle } from "../ingredients/ingredient-circle"
import { Price } from "../ingredients/price"
import styles from "./order.module.css"

const MAX_INGREDIENTS = 6

interface IIngredients {
    items: string[]
}

const Ingredients: FC<IIngredients> = ({ items }) => {

    const ingredients = useSelector(ingredientsSelectors.items)
    const images = items.reduce<string[]>(
        (prev, item) => {
            const ingredient = ingredients.find((ingredient: TIngredient) => ingredient._id === item)
            if (ingredient) {
                prev.push(ingredient.image)
            }
            return prev
        }, [])


    return (
        <div className={styles.ingredients}>
            {
                images.map((image: string, index: number, array: string[]) => {
                    const overload_counter = array.length - MAX_INGREDIENTS
                    return index < MAX_INGREDIENTS
                        ? <div key={index} style={{ zIndex: 100 - index }} >
                            <IngredientCircle image={image} />
                            {
                                index === MAX_INGREDIENTS - 1 && overload_counter > 0
                                    ?
                                    <span className={styles.overload_counter}>+{overload_counter}</span>
                                    : null
                            }
                        </div>
                        : null
                })
            }
        </div >
    )
}

interface IOrder {
    order: TFeedOrder
}

export const Order: FC<IOrder> = ({ order }) => {

    const location = useLocation()
    const { _id } = order
    const ingredients = useSelector(ingredientsSelectors.items)
    const total_price = order.ingredients.reduce<number>(
        (prev, item) => {
            const ingredient = ingredients.find((ingredient: TIngredient) => ingredient._id === item)
            if (ingredient) {
                prev += ingredient.price
            }
            return prev
        }, 0)

    return (
        <Link className={styles.link}
            key={_id}
            to={{
                pathname: `${location.pathname}/${_id}`,
                state: { background: location }
            }}
        >
            <div className={styles.card}>
                <div className={styles.header}>
                    <span className={`text text_type_digits-default ${styles.number}`}>#{order.number}</span>
                    <span className={`text text_type_main-small ${styles.time}`}><DateTime time={order.updatedAt} /></span>
                </div>
                <span className={styles.name}>{order.name}</span>
                <div className={styles.ingredients_with_total}>
                    <Ingredients items={order.ingredients} />
                    <Price price={total_price} />
                </div>
            </div>
        </Link>
    )
}