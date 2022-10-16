import { FC } from "react"
import { useSelector } from "react-redux"
import { ingredientsSelectors } from "../../services/selectors/ingredients"
import { TFeedOrder, TIngredient } from "../../utils/types"
import styles from "./order-info.module.css"
import { Price } from "../ingredients/price"
import { IngredientCircle } from "../ingredients/ingredient-circle"
import { useParams } from "react-router-dom"
import { feedSelectors } from "../../services/selectors/feed"
import { ordersSelectors } from "../../services/selectors/orders"

interface IIngredient {
    item: TIngredient
}

const Ingredient: FC<IIngredient> = ({ item }) => {
    const { image, name, price } = item
    return (
        <div className={styles.ingredient}>
            <IngredientCircle image={image} />
            <span className={styles.ingredient_name}>{name}</span>
            <Price price={price} />
        </div>
    )
}

interface IOrderInfo {
    id: string | undefined
}

export const OrderInfo: FC = () => {

    const ingredients = useSelector(ingredientsSelectors.items)
    const orders = Array.prototype.concat(useSelector(feedSelectors.orders), useSelector(ordersSelectors.orders))
    const { id } = useParams<IOrderInfo>()

    const order: TFeedOrder = orders.find((order: TFeedOrder) => order._id === id)

    if (!order) return null

    const status = {
        done: 'Выполнен',
        created: 'Создан',
        pending: 'Завершен',
    }[order.status]

    const orderIngredients = order.ingredients.reduce<TIngredient[]>(
        (prev, item) => {
            const ingredient = ingredients.find((ingredient: TIngredient) => ingredient._id === item)
            if (ingredient) {
                prev.push(ingredient)
            }
            return prev
        }, [])

    const totalPrice = orderIngredients.reduce<number>((prev, item) => prev + item.price, 0)

    return (
        <div className={styles.wrapper}>
            <p className={`text text_type_digits-default ${styles.number}`}>#{order.number}</p>
            <p className={`text text_type_main-medium mt-10`}>Black Hole Singularity острый бургер</p>
            <p className={`text text_type_main-small mt-3 ${styles.status}`}>{status}</p>
            <p className={`text text_type_main-medium mt-15`}>Состав:</p>
            <div className={styles.ingredients}>
                {orderIngredients.map((ingredient: TIngredient) => <Ingredient item={ingredient} />)}
            </div>
            <div className={styles.footer}>
                <span className={styles.time}>{order.createdAt}</span>
                <Price price={totalPrice} />
            </div>
        </div>
    )
}