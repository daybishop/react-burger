const items = state => state.constructor.items
const bun = state => state.constructor.bun
const totalPrice = state => state.constructor.totalPrice
const orderNumber = state => state.constructor.orderNumber
const showOrderModal = state => state.constructor.showOrderModal
const isOrderRequested = state => state.constructor.isOrderRequested

export const constructorSelectors = {
    items,
    bun,
    totalPrice,
    orderNumber,
    showOrderModal,
    isOrderRequested,
}
