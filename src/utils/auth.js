import { getCookie } from "./cookie"

export const isAuth = () => {
    return !!getCookie('accessToken')
}