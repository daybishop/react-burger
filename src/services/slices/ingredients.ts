import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit'
import { TIngredient } from '../../utils/types'

interface IIngredientsState {
    items: TIngredient[]
    isLoading: boolean
    error: boolean
    selectedItem: TIngredient | null
    currentTab: string
}

export const initialState = {
    items: [],
    isLoading: false,
    error: false,
    selectedItem: null,
    currentTab: 'bun',
}

export const ingredientsSlice = createSlice<IIngredientsState, SliceCaseReducers<IIngredientsState>, string>({
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
        },
        setCurrentTab: (state, action) => {
            const currentTab = action.payload
            if (state.currentTab !== currentTab) {
                state.currentTab = currentTab
            }
        },
    },
})

export const { startLoading, loadingSuccess, hasError, selectItem, clearSelectedItem, setCurrentTab } = ingredientsSlice.actions

export default ingredientsSlice.reducer