import { FC } from "react"
import { TFeedOrder } from "../../utils/types"
import { Order } from "./order"
import styles from "./orders.module.css"

interface IOrders {
    orders: TFeedOrder[]
}

export const Orders: FC<IOrders> = ({ orders }) => {
    return (
        <section className={styles.section}>
            <div className={styles.orders}>
                {orders.map(order => <Order key={order.number} order={order} />)}
            </div>
        </section>
    )
}