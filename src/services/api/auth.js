import { checkResponse } from "../../components/common/api";
import { API } from "../../utils/constants";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";

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

const setTokens = data => {
    deleteCookie('accessToken')
    deleteCookie('refreshToken')
    if (data) {
        setCookie('accessToken', data.accessToken.split(' ')[1])
        setCookie('refreshToken', data.refreshToken)
    }
}

export const getAccessToken = () => {
    let accessToken = getCookie('accessToken')
    if (!accessToken) return null
    const accessTokenData = JSON.parse(window.atob(accessToken.split('.')[1]))

    if (Date.now() > (accessTokenData.exp * 1000 - 60 * 1000)) {
        refreshTokenRequest()
            .then(data => setTokens(data))
            .catch(reason => {
                setTokens(null)
                console.log(`Refresh token error: ${reason}`)
            })
        accessToken = getCookie('accessToken')
    }
    return accessToken || null
}

const fetchWithToken = async (url, init) => {
    const accessToken = getAccessToken()
    if (!accessToken) return new Promise.reject('Access Token not found');
    return await fetch(url, {
        ...init,
        headers: { ...init.headers, authorization: `Bearer ${accessToken}` },
    })
}

export const loginRequest = async form => {
    return await fetch(LOGIN, {
        ...init,
        body: JSON.stringify(form),
    })
        .then(checkResponse)
        .then(data => {
            setTokens(data)
            return Promise.resolve(data)
        })
}

export const logoutRequest = async () => {
    return fetch(LOGOUT, {
        ...init,
        body: JSON.stringify({ 'token': `${getCookie('refreshToken')}` }),
    })
        .then(checkResponse)
        .then(data => {
            setTokens(null)
            return Promise.resolve(data)
        })
}

export const registerRequest = async form => {
    return await fetch(REGISTER, {
        ...init,
        body: JSON.stringify(form),
    })
        .then(checkResponse)
        .then(data => {
            setTokens(data)
            return Promise.resolve(data)
        })
}

export const forgotPasswordRequest = async form => {
    return await fetch(PASSWORD_FORGOT, {
        ...init,
        body: JSON.stringify(form),
    })
        .then(checkResponse)
}

export const resetPasswordRequest = async form => {
    return await fetch(PASSWORD_RESET, {
        ...init,
        body: JSON.stringify(form),
    })
        .then(checkResponse)
}

export const getUserRequest = async () => {
    return await fetchWithToken(USER, {
        ...init,
        method: 'GET',
    })
        .then(checkResponse)
}

export const setUserRequest = async form => {
    return await fetchWithToken(USER, {
        ...init,
        method: 'PATCH',
        body: JSON.stringify(form),
    })
        .then(checkResponse)
}

export const refreshTokenRequest = async () => {
    return await fetch(TOKEN, {
        ...init,
        body: JSON.stringify({ 'token': `${getCookie('refreshToken')}` }),
    })
        .then(checkResponse)
        .then(data => {
            setTokens(data)
        })
        .catch()
}