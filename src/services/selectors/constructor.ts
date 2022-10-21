import { TRootState } from "../../store"

const items = (state: TRootState) => state.constructor.items
const bun = (state: TRootState) => state.constructor.bun
const totalPrice = (state: TRootState) => state.constructor.totalPrice
const orderNumber = (state: TRootState) => state.constructor.orderNumber
const showOrderModal = (state: TRootState) => state.constructor.showOrderModal
const isOrderRequested = (state: TRootState) => state.constructor.isOrderRequested

export const constructorSelectors = {
    items,
    bun,
    totalPrice,
    orderNumber,
    showOrderModal,
    isOrderRequested,
}
