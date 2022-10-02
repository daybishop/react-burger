import { getAccessToken } from "./auth";

export interface IResponseCommon {
    success: boolean
    message?: string
}

export interface IFetchInit {
    method: 'GET' | 'POST' | 'PATCH'
    mode: 'cors'
    cache: 'no-cache'
    credentials: 'same-origin'
    headers: {
        'Content-Type': 'application/json'
        authorization?: string
    }
    redirect: 'follow'
    referrerPolicy: 'no-referrer'
    body?: string
}

export const init: IFetchInit = {
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

export const doRequest = async <T>(url: string, init: IFetchInit) => {
    return await fetch(url, init)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
                .then(data => {
                    if (data.success) {
                        return Promise.resolve<T>(data)
                    } else throw new Error("Error data loading");
                })
        })
}

export const fetchWithToken = async <T>(url: string, init: IFetchInit) => {
    const accessToken = getAccessToken()
    if (!accessToken) return Promise.reject('Access Token not found');
    return await doRequest<T>(url, {
        ...init,
        headers: { ...init.headers, authorization: `Bearer ${accessToken}` },
    })
}
