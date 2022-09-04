import { checkResponse } from "../../components/common/api";
import { API } from "../../utils/constants";
import { getCookie, setCookie } from "../../utils/cookie";

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

const init = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
        // 'authorization': getCookie('accessToken')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
}

export const loginRequest = async form => {
    return fetch(LOGIN, {
        ...init,
        body: JSON.stringify(form),
    })
        .then(checkResponse)
        .catch(reason => console.log(reason))
}

export const logoutRequest = async () => {
    return fetch(LOGOUT, {
        ...init,
        body: JSON.stringify({ 'token': `${getCookie('refreshToken')}` }),
    })
        .then(checkResponse)
}

export const registerRequest = async form => {
    return fetch(REGISTER, {
        ...init,
        body: JSON.stringify(form),
    })
        .then(checkResponse)
}

export const forgotPasswordRequest = async form => {
    return fetch(PASSWORD_FORGOT, {
        ...init,
        body: JSON.stringify(form),
    })
        .then(checkResponse)
}

export const resetPasswordRequest = async form => {
    return fetch(PASSWORD_RESET, {
        ...init,
        body: JSON.stringify(form),
    })
        .then(checkResponse)
}

export const getUserRequest = async () => {
    return getCookie('accessToken')
        ?
        fetch(USER, {
            ...init,
            method: 'GET',
            headers: { ...init.headers, authorization: getCookie('accessToken') },
        })
            .then(checkResponse)
            .catch(reason => refreshTokenRequest())
        :
        Promise.reject('accessToken not found')
}

export const refreshTokenRequest = async () => {
    return fetch(TOKEN, {
        ...init,
        body: JSON.stringify({ 'token': `${getCookie('refreshToken')}` }),
    })
        .then(checkResponse)
        .then(data => {
            if (data.success) {
                setCookie('accessToken', data.accessToken)
                setCookie('refreshToken', data.refreshToken)
            }
        })
        .catch(reason => console.log(reason))
}