import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

export const initialState = {
    items: [],
    backupItems: [],
    bun: null,
    totalPrice: 0,
    orderNumber: null,
    showOrderModal: false,
    isOrderRequested: false,
}

const calculateTotalPrice = state => (state.bun ? 2 * state.bun.price : 0) + state.items.reduce((prev, item) => prev + item.price, 0)

export const constructorSlice = createSlice({
    name: 'constructor',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.items.push({ ...action.payload, uuid: uuidv4() })
            state.totalPrice = calculateTotalPrice(state)
        },
        deleteItem: (state, action) => {
            state.items = state.items.filter((item) => item.uuid !== action.payload)
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
        clearOrderData: state => {
            state.bun = null
            state.items = []
            state.totalPrice = calculateTotalPrice(state)
            state.orderNumber = null
        },
        setOrderNumber: (state, action) => {
            state.orderNumber = action.payload
        },
        moveItem: (state, action) => {
            const { dragIndex, hoverIndex } = action.payload
            const dragItem = state.items[dragIndex];
            const items = state.items;
            const hoverItem = items.splice(hoverIndex, 1, dragItem).pop()
            items.splice(dragIndex, 1, hoverItem)
            state.items = items
        },
        backup: (state) => {
            state.backupItems = state.items
        },
        restore: (state) => {
            state.items = state.backupItems
        },
        showOrder: (state) => {
            state.showOrderModal = true
        },
        hideOrder: (state) => {
            state.showOrderModal = false
        },
        setOrderRequested: (state, action) => {
            state.isOrderRequested = action.payload
        },
    },
})

export const { addItem, deleteItem, addBun, deleteBun, clearOrderData, setOrderNumber, moveItem, backup, restore, showOrder, hideOrder, setOrderRequested } = constructorSlice.actions

export default constructorSlice.reducer