import { Orders } from "../components/orders/orders"
import { FeedTotal } from "../components/feed/feed-total"
import { useSelector } from "react-redux";
import { feedSelectors } from "../services/selectors/feed";

export const FeedPage = () => {

    const orders = useSelector(feedSelectors.orders)
    const total = useSelector(feedSelectors.total)
    const totalToday = useSelector(feedSelectors.totalToday)

    return (
        <>
            <p className="text text_type_main-large pt-10 pb-5">
                Лента заказов
            </p>
            <main className="two_panels">
                {orders && <Orders orders={orders} />}
                {orders && <FeedTotal orders={orders} total={total} totalToday={totalToday} />}
            </main>
        </>
    )
}