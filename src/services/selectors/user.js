export const name = state => state.user.name
export const email = state => state.user.email
export const isActive = state => state.user.isActive
export const isLoading = state => state.user.isLoading
export const isPasswordReset = state => state.user.isPasswordReset

export const userSelectors = {
    name,
    email,
    isActive,
    isLoading,
    isPasswordReset,
}
