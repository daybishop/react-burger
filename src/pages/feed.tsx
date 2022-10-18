import { Orders } from "../components/orders/orders"
import { FeedTotal } from "../components/feed/feed-total"
import { feedSelectors } from "../services/selectors/feed";
import { useAppSelector } from "../utils/hooks";

export const FeedPage = () => {

    const orders = useAppSelector(feedSelectors.orders)
    const total = useAppSelector(feedSelectors.total)
    const totalToday = useAppSelector(feedSelectors.totalToday)

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