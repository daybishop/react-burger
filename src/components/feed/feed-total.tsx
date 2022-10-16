import { FC } from "react";
import { TFeedOrder } from "../../utils/types";
import styles from "./feed-total.module.css"

interface IStatusSection {
    name: string
    numbers: number[]
    color?: string
}

const StatusSection: FC<IStatusSection> = ({ name, numbers, color }) => {
    return (
        <div className={styles.status}>
            <p className="text text_type_main-medium">{name}:</p>
            <div className={styles.status_numbers}>
                {numbers.map(number => <span key={number} className={`text text_type_digits-default ${styles.number}`} style={{ color }}>{number}</span>)}
            </div>
        </div>
    )
}

interface ITotalSection {
    name: string
    count: number
}
const TotalSection: FC<ITotalSection> = ({ name, count }) => {
    return (
        <div className={styles.total}>
            <p className="text text_type_main-medium">{name}:</p>
            <span className={`text text_type_digits-large`}>{count}</span>
        </div>
    )
}

interface IFeedTotal {
    orders: TFeedOrder[]
    total: number
    totalToday: number
}

export const FeedTotal: FC<IFeedTotal> = ({ orders, total, totalToday }) => {
    const done = orders.filter((order: TFeedOrder) => order.status === 'done').map((order: TFeedOrder) => order.number).slice(0, 36)
    const pending = orders.filter((order: TFeedOrder) => order.status === 'pending').map((order: TFeedOrder) => order.number)
    return (
        <section className={styles.section}>
            <div className={styles.status_wrapper}>
                <StatusSection name='Готовы' numbers={done} color={'#00CCCC'} />
                <StatusSection name='В работе' numbers={pending} />
            </div>
            <TotalSection name="Выполнено за все время" count={total} />
            <TotalSection name="Выполнено за сегодня" count={totalToday} />
        </section>
    )
}