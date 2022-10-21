import { TRootState } from "../../store"

const name = (state: TRootState) => state.user.name
const email = (state: TRootState) => state.user.email
const isLoggedOn = (state: TRootState) => state.user.isLoggedOn
const isPasswordReset = (state: TRootState) => state.user.isPasswordReset

export const userSelectors = {
    name,
    email,
    isLoggedOn,
    isPasswordReset,
}
