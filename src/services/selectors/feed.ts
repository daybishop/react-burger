import { TRootState } from "../../store"

const orders = (state: TRootState) => state.feed.orders
const total = (state: TRootState) => state.feed.total
const totalToday = (state: TRootState) => state.feed.totalToday

export const feedSelectors = {
    orders,
    total,
    totalToday
}
