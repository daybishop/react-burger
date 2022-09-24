import { forgotPasswordRequest, getUserRequest, loginRequest, logoutRequest, registerRequest, resetPasswordRequest, setUserRequest } from "../api/auth"
import { setIsPasswordReset, setUser } from "../slices/user"

export const loginUser = (form) => dispatch => {
    loginRequest(form)
        .then(data => {
            dispatch(setUser(data.user))
        })
        .catch(reason => {
            dispatch(setUser(null))
            console.log(reason)
        })
}

export const logoutUser = () => dispatch => {
    logoutRequest()
        .then(data => {
            if (data.success) {
                dispatch(setUser(null))
            }
        })
        .catch(reason => console.log(reason))
}

export const register = (form) => dispatch => {
    registerRequest(form)
        .then(data => {
            dispatch(setUser(data.user))
        })
        .catch(reason => console.log(reason))
}

export const forgotPassword = (form) => dispatch => {
    forgotPasswordRequest(form)
        .then(data => {
            dispatch(setIsPasswordReset(true))
        })
        .catch(reason => console.log(reason))
}

export const resetPassword = (form) => dispatch => {
    resetPasswordRequest(form)
        .then(data => {
            dispatch(setIsPasswordReset(false))
        })
        .catch(reason => console.log(reason))
}

export const getUser = () => dispatch => {
    getUserRequest()
        .then(data => {
            dispatch(setUser(data.user))
        })
        .catch(reason => {
            console.error(reason)
            dispatch(setUser(null))
        })
}

export const setUserData = form => dispatch => {
    setUserRequest(form)
        .then(data => {
            dispatch(setUser(data.user))
        })
        .catch(reason => {
            console.error(reason)
        })
}
