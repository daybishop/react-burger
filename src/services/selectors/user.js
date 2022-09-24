const name = state => state.user.name
const email = state => state.user.email
const isLoggedOn = state => state.user.isLoggedOn
const isPasswordReset = state => state.user.isPasswordReset

export const userSelectors = {
    name,
    email,
    isLoggedOn,
    isPasswordReset,
}
