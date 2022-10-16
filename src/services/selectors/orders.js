const orders = state => state.orders.orders
const total = state => state.orders.total
const totalToday = state => state.orders.totalToday

export const ordersSelectors = {
    orders,
    total,
    totalToday
}
