export const name = state => state.user.name
export const email = state => state.user.email
export const isActive = state => state.user.isActive
export const isLoaded = state => state.user.isLoaded
export const isPasswordReset = state => state.user.isPasswordReset

export const userSelectors = {
    name,
    email,
    isActive,
    isLoaded,
    isPasswordReset,
}
