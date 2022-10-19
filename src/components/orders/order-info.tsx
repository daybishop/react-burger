import { FC } from "react"
import { ingredientsSelectors } from "../../services/selectors/ingredients"
import { TFeedOrder, TIngredient } from "../../utils/types"
import styles from "./order-info.module.css"
import { Price } from "../ingredients/price"
import { IngredientCircle } from "../ingredients/ingredient-circle"
import { useParams } from "react-router-dom"
import { feedSelectors } from "../../services/selectors/feed"
import { ordersSelectors } from "../../services/selectors/orders"
import { useAppSelector } from "../../utils/hooks"

interface IIngredient {
    item: TIngredient
    count?: number
}

const Ingredient: FC<IIngredient> = ({ item, count }) => {
    const { image, name, price } = item
    return (
        <div className={styles.ingredient}>
            <IngredientCircle image={image} />
            <span className={styles.ingredient_name}>{name}</span>
            <Price price={price} count={count} />
        </div>
    )
}

interface IOrderInfo {
    id: string | undefined
}

export const OrderInfo: FC = () => {

    const ingredients = useAppSelector(ingredientsSelectors.items)
    const orders: TFeedOrder[] = Array.prototype.concat(useAppSelector(feedSelectors.orders), useAppSelector(ordersSelectors.orders))
    const { id } = useParams<IOrderInfo>()

    const order = orders.find((order) => order._id === id)

    if (!order) return null

    const status = {
        done: 'Выполнен',
        created: 'Создан',
        pending: 'Завершен',
    }[order.status]

    const counts: { [k: string]: number } = {};
    const prices: number[] = [];
    const orderIngredients = order.ingredients.reduce<Array<TIngredient>>(
        (prev, item) => {
            const ingredient = ingredients.find((ingredient) => ingredient._id === item)
            if (ingredient) {
                prices.push(ingredient.price)
                if (counts[ingredient._id]) {
                    counts[ingredient._id]++
                } else {
                    counts[ingredient._id] = 1
                    prev.push(ingredient)
                }
            }
            return prev
        }, [])

    const totalPrice = prices.reduce((prev, item) => prev + item, 0)

    return (
        <div className={styles.wrapper}>
            <p className={`text text_type_digits-default ${styles.number}`}>#{order.number}</p>
            <p className={`text text_type_main-medium mt-10`}>Black Hole Singularity острый бургер</p>
            <p className={`text text_type_main-small mt-3 ${styles.status}`}>{status}</p>
            <p className={`text text_type_main-medium mt-15`}>Состав:</p>
            <div className={styles.ingredients}>
                {orderIngredients.map((ingredient) => <Ingredient key={ingredient._id} item={ingredient} count={counts[ingredient._id]} />)}
            </div>
            <div className={styles.footer}>
                <span className={styles.time}><DateTime time={order.updatedAt} /></span>
                <Price price={totalPrice} />
            </div>
        </div>
    )
}