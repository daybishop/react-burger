import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    isLoading: false,
    error: false,
    selectedItem: null,
}

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading = true
            state.error = false
        },
        loadingSuccess: (state, action) => {
            state.isLoading = false
            state.items = action.payload
        },
        hasError: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        selectItem: (state, action) => {
            state.selectedItem = action.payload
        },
        clearSelectedItem: (state) => {
            state.selectedItem = null
        }
    },
})

export const { startLoading, loadingSuccess, hasError, selectItem, clearSelectedItem } = ingredientsSlice.actions

export default ingredientsSlice.reducer