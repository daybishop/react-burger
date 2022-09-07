import { deleteCookie, setCookie } from "../../utils/cookie";
import { forgotPasswordRequest, getUserRequest, loginRequest, logoutRequest, registerRequest, resetPasswordRequest } from "../api/auth"
import { resetUser, setIsPasswordReset, setUser } from "../slices/user"

export const loginUser = (form) => dispatch => {
    loginRequest(form)
        .then(data => {
            if (data.success) {
                dispatch(setUser(data.user))
                setCookie('accessToken', data.accessToken)
                setCookie('refreshToken', data.refreshToken)
            }
        })
        .catch(reason => console.log(reason))
}

export const logoutUser = () => dispatch => {
    logoutRequest()
        .then(data => {
            if (data.success) {
                dispatch(resetUser(data.user))
                deleteCookie('accessToken')
                deleteCookie('refreshToken')
            }
        })
        .catch(reason => console.log(reason))
}

export const register = (form) => dispatch => {
    registerRequest(form)
        .then(data => {
            if (data.success) {
                dispatch(setUser(data.user))
                setCookie('accessToken', data.accessToken)
                setCookie('refreshToken', data.refreshToken)
            }
        })
        .catch(reason => console.log(reason))
}

export const forgotPassword = (form) => dispatch => {
    forgotPasswordRequest(form)
        .then(data => {
            if (data.success) {
                dispatch(setIsPasswordReset(true))
            }
        })
        .catch(reason => console.log(reason))
}

export const resetPassword = (form) => dispatch => {
    resetPasswordRequest(form)
        .then(data => {
            if (data.success) {
                dispatch(setIsPasswordReset(false))
            }
        })
        .catch(reason => console.log(reason))
}

export const getUser = () => dispatch => {
    getUserRequest()
        .then(data => {
            if (data && data.success) {
                dispatch(setUser(data.user))
            }
        })
        .catch(reason => {
            console.error(reason)
            dispatch(resetUser())
        })
}