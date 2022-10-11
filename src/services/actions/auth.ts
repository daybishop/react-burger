import { Dispatch } from "redux"
import { IForm } from "../../utils/types"
import { forgotPasswordRequest, getUserRequest, loginRequest, logoutRequest, registerRequest, resetPasswordRequest, setUserRequest } from "../api/auth"
import { setIsPasswordReset, setUser } from "../slices/user"

export const loginUser = (form: IForm) => (dispatch: Dispatch) => {
    loginRequest(form)
        .then(data => {
            dispatch(setUser(data.user))
        })
        .catch(reason => {
            dispatch(setUser(null))
            console.log(reason)
        })
}

export const logoutUser = () => (dispatch: Dispatch) => {
    logoutRequest()
        .then(data => {
            if (data.success) {
                dispatch(setUser(null))
            }
        })
        .catch(reason => console.log(reason))
}

export const register = (form: IForm) => (dispatch: Dispatch) => {
    registerRequest(form)
        .then(data => {
            dispatch(setUser(data.user))
        })
        .catch(reason => console.log(reason))
}

export const forgotPassword = (form: IForm) => (dispatch: Dispatch) => {
    forgotPasswordRequest(form)
        .then(data => {
            dispatch(setIsPasswordReset(true))
        })
        .catch(reason => console.log(reason))
}

export const resetPassword = (form: IForm) => (dispatch: Dispatch) => {
    resetPasswordRequest(form)
        .then(data => {
            dispatch(setIsPasswordReset(false))
        })
        .catch(reason => console.log(reason))
}

export const getUser = () => (dispatch: Dispatch) => {
    getUserRequest()
        .then(data => {
            dispatch(setUser(data.user))
        })
        .catch(reason => {
            console.error(reason)
            dispatch(setUser(null))
        })
}

export const setUserData = (form: IForm) => (dispatch: Dispatch) => {
    setUserRequest(form)
        .then(data => {
            dispatch(setUser(data.user))
        })
        .catch(reason => {
            console.error(reason)
        })
}
