import { TRootState } from "../../store"

const orders = (state: TRootState) => state.orders.orders
const total = (state: TRootState) => state.orders.total
const totalToday = (state: TRootState) => state.orders.totalToday

export const ordersSelectors = {
    orders,
    total,
    totalToday
}
