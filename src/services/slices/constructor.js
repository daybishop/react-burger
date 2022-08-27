import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    bun: null,
    totalPrice: 0,
    orderNumber: null,
}

const calculateTotalPrice = state => (state.bun ? 2 * state.bun.price : 0) + state.items.reduce((prev, item) => prev + item.price, 0)

export const constructorSlice = createSlice({
    name: 'constructor',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload)
            state.totalPrice = calculateTotalPrice(state)
        },
        deleteItem: (state, action) => {
            state.items = state.items.filter((_, index) => index !== action.payload)
            state.totalPrice = calculateTotalPrice(state)
        },
        addBun: (state, action) => {
            state.bun = action.payload
            state.totalPrice = calculateTotalPrice(state)
        },
        deleteBun: state => {
            state.bun = null
            state.totalPrice = calculateTotalPrice(state)
        },
        setOrderNumber: (state, action) => {
            state.orderNumber = action.payload
        }
    },
})

export const { addItem, deleteItem, addBun, deleteBun, setOrderNumber } = constructorSlice.actions

export default constructorSlice.reducer