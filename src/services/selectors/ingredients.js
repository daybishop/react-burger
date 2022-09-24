const items = state => state.ingredients.items
const selectedItem = state => state.ingredients.selectedItem
const currentTab = state => state.ingredients.currentTab

export const ingredientsSelectors = {
    items,
    selectedItem,
    currentTab,
}
