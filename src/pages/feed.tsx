import { Orders } from "../components/orders/orders"
import { FeedTotal } from "../components/feed/feed-total"
import { feedSelectors } from "../services/selectors/feed";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { useEffect } from 'react';
import { connectionClose, connectionStart } from "../services/slices/feed";

export const FeedPage = () => {

    const orders = useAppSelector(feedSelectors.orders)
    const total = useAppSelector(feedSelectors.total)
    const totalToday = useAppSelector(feedSelectors.totalToday)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(connectionStart(''))
        return () => {
            dispatch(connectionClose(''))
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

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