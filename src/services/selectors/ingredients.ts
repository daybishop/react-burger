import { TRootState } from "../../store"

const items = (state: TRootState) => state.ingredients.items
const selectedItem = (state: TRootState) => state.ingredients.selectedItem
const currentTab = (state: TRootState) => state.ingredients.currentTab

export const ingredientsSelectors = {
    items,
    selectedItem,
    currentTab,
}
