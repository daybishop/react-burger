import { deleteCookie, setCookie } from "../../utils/cookie";
import { forgotPasswordRequest, getUserRequest, loginRequest, logoutRequest, registerRequest, resetPasswordRequest } from "../api/auth"
import { resetUser, setIsPasswordReset, setUser } from "../slices/user"

export const loginUser = (form) => dispath => {
    loginRequest(form)
        .then(data => {
            if (data.success) {
                dispath(setUser(data.user))
                setCookie('accessToken', data.accessToken)
                setCookie('refreshToken', data.refreshToken)
            }
        })
        .catch(reason => console.log(reason))
}

export const logoutUser = () => dispath => {
    console.log('222')
    logoutRequest()
        .then(data => {
            if (data.success) {
                console.log(data.user)
                dispath(resetUser(data.user))
                deleteCookie('accessToken')
                deleteCookie('refreshToken')
            }
        })
        .catch(reason => console.log(reason))
}

export const register = (form) => dispath => {
    registerRequest(form)
        .then(data => {
            if (data.success) {
                dispath(setUser(data.user))
                setCookie('accessToken', data.accessToken)
                setCookie('refreshToken', data.refreshToken)
            }
        })
        .catch(reason => console.log(reason))
}

export const forgotPassword = (form) => dispath => {
    forgotPasswordRequest(form)
        .then(data => {
            if (data.success) {
                dispath(setIsPasswordReset(true))
            }
        })
        .catch(reason => console.log(reason))
}

export const resetPassword = (form) => dispath => {
    resetPasswordRequest(form)
        .then(data => {
            if (data.success) {
                dispath(setIsPasswordReset(false))
            }
        })
        .catch(reason => console.log(reason))
}

export const getUser = () => dispath => {
    getUserRequest()
        .then(data => {
            if (data && data.success) {
                dispath(setUser(data.user))
            }
        })
        .catch(reason => {
            console.error(reason)
            dispath(resetUser())
        })
}