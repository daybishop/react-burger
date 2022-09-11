import { getAccessToken } from "./auth";

export const checkResponse = res => {
    if (res.ok) {
        return res.json()
            .then(data => {
                if (data.success) {
                    return Promise.resolve(data)
                } else throw new Error("Error data loading");
            })
    }
    return Promise.reject(`Ошибка ${res.status}`)
}

export const init = {
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

export const doRequest = async (url, init) => {
    return await fetch(url, init).then(checkResponse)
}

export const fetchWithToken = async (url, init) => {
    const accessToken = getAccessToken()
    if (!accessToken) return new Promise.reject('Access Token not found');
    return await fetch(url, {
        ...init,
        headers: { ...init.headers, authorization: `Bearer ${accessToken}` },
    })
}
