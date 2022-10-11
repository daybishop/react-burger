import { API } from "../../utils/constants";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";
import { IForm } from "../../utils/types";
import { doRequest, fetchWithToken, init, IResponseCommon } from "./common";

// type TResponseTokensData = {
//     accessToken: string
//     refreshToken: string
// } | null


interface IResponseTokens extends IResponseCommon {
    accessToken: string
    refreshToken: string
}

interface IResponseUser extends IResponseTokens {
    user: {
        email: string
        name: string
    }
}

export type TResponse = IResponseCommon | IResponseTokens | IResponseUser

// POST https://norma.nomoreparties.space/api/auth/login - эндпоинт для авторизации.
// POST https://norma.nomoreparties.space/api/auth/register - эндпоинт для регистрации пользователя.
// POST https://norma.nomoreparties.space/api/auth/logout - эндпоинт для выхода из системы.
// POST https://norma.nomoreparties.space/api/auth/token - эндпоинт обновления токена. 
// GET https://norma.nomoreparties.space/api/auth/user - эндпоинт получения данных о пользователе.
// PATCH https://norma.nomoreparties.space/api/auth/user - эндпоинт обновления данных о пользователе.
// POST https://norma.nomoreparties.space/api/password-reset/ - forgot
// POST https://norma.nomoreparties.space/api/password-reset/reset - reset

const LOGIN = `${API}/auth/login`
const LOGOUT = `${API}/auth/logout`
const USER = `${API}/auth/user`
const TOKEN = `${API}/auth/token`
const REGISTER = `${API}/auth/register`
const PASSWORD_FORGOT = `${API}/password-reset`
const PASSWORD_RESET = `${API}/password-reset/reset`

const setTokens = (data: IResponseTokens | null) => {
    deleteCookie('accessToken')
    deleteCookie('refreshToken')
    if (data) {
        setCookie('accessToken', data.accessToken.split(' ')[1])
        setCookie('refreshToken', data.refreshToken)
    }
}

export const getAccessToken = (): string | null => {
    let accessToken = getCookie('accessToken')
    if (!accessToken) return null
    const accessTokenData = JSON.parse(window.atob(accessToken.split('.')[1]))

    if (Date.now() > (accessTokenData.exp * 1000 - 60 * 1000)) {
        refreshTokenRequest<IResponseTokens>()
            .then(data => setTokens(data))
            .catch(reason => {
                setTokens(null)
                console.log(`Refresh token error: ${reason}`)
            })
        accessToken = getCookie('accessToken')
    }
    return accessToken || null
}

export const loginRequest = async (form: IForm) => {
    return await doRequest<IResponseUser>(LOGIN, {
        ...init,
        body: JSON.stringify(form),
    })
        .then(data => {
            setTokens(data)
            return Promise.resolve(data)
        })
}

export const logoutRequest = async () => {
    return doRequest<IResponseTokens>(LOGOUT, {
        ...init,
        body: JSON.stringify({ 'token': `${getCookie('refreshToken')}` }),
    })
        .then(data => {
            setTokens(null)
            return Promise.resolve(data)
        })
}

export const registerRequest = async (form: IForm) => {
    return await doRequest<IResponseUser>(REGISTER, {
        ...init,
        body: JSON.stringify(form),
    })
        .then(data => {
            setTokens(data)
            return Promise.resolve(data)
        })
}

export const forgotPasswordRequest = async (form: IForm) => {
    return await doRequest<TResponse>(PASSWORD_FORGOT, {
        ...init,
        body: JSON.stringify(form),
    })
}

export const resetPasswordRequest = async (form: IForm) => {
    return await doRequest<TResponse>(PASSWORD_RESET, {
        ...init,
        body: JSON.stringify(form),
    })
}

export const getUserRequest = async () => {
    return await fetchWithToken<IResponseUser>(USER, {
        ...init,
        method: 'GET',
    })
}

export const setUserRequest = async (form: IForm) => {
    return await fetchWithToken<IResponseUser>(USER, {
        ...init,
        method: 'PATCH',
        body: JSON.stringify(form),
    })
}

export const refreshTokenRequest = async <T>() => {
    return await doRequest<T>(TOKEN, {
        ...init,
        body: JSON.stringify({ 'token': `${getCookie('refreshToken')}` }),
    })
        .catch()
}