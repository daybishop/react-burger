const orders = state => state.feed.orders
const total = state => state.feed.total
const totalToday = state => state.feed.totalToday

export const feedSelectors = {
    orders,
    total,
    totalToday
}
