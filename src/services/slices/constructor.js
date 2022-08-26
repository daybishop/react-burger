import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    orderNumber: null,
}

export const constructorSlice = createSlice({
    name: 'constructor',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload)
        },
        deleteItem: (state, action) => {
            state.items = state.items.filter(id => id !== action.payload)
        },
        setOrderNumber: (state, action) => {
            state.orderNumber = action.payload
        }
    },
})

export const { addItem, deleteItem, setOrderNumber } = constructorSlice.actions

export default constructorSlice.reducer