import { FC } from "react"
import { ingredientsSelectors } from "../../services/selectors/ingredients"
import { TFeedOrder, TIngredient } from "../../utils/types"
import styles from "./order-info.module.css"
import { Price } from "../ingredients/price"
import { IngredientCircle } from "../ingredients/ingredient-circle"
import { useParams, useRouteMatch } from "react-router-dom"
import { feedSelectors } from "../../services/selectors/feed"
import { ordersSelectors } from "../../services/selectors/orders"
import { useAppDispatch, useAppSelector } from "../../utils/hooks"
import { DateTime } from "../datetime/datetime"
import { useEffect } from 'react';
import { connectionClose as feedClose, connectionStart as feedStart } from "../../services/slices/feed";
import { connectionClose as ordersClose, connectionStart as ordersStart } from "../../services/slices/orders";



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
    const dispatch = useAppDispatch()

    const isFeed = useRouteMatch({ path: '/feed/:id', exact: true })
    const isOrders = useRouteMatch({ path: '/profile/orders/:id', exact: true })

    useEffect(() => {
        isFeed && dispatch(feedStart(''))
        isOrders && dispatch(ordersStart(''))
        return () => {
            isFeed && dispatch(feedClose(''))
            isOrders && dispatch(ordersClose(''))
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const order = orders.find((order) => order._id === id)

    if (!order) return null

    const status = {
        done: '????????????????',
        created: '????????????',
        pending: '????????????????',
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
            <p className={`text text_type_main-medium mt-10`}>Black Hole Singularity ???????????? ????????????</p>
            <p className={`text text_type_main-small mt-3 ${styles.status}`}>{status}</p>
            <p className={`text text_type_main-medium mt-15`}>????????????:</p>
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