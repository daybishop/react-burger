import { API } from "../../utils/constants"
import { checkResponse, fetchWithToken, init } from "./common"

const ORDERS = `${API}/orders`

export const saveOrderRequest = async (items) => {
    return await fetchWithToken(ORDERS, {
        ...init,
        method: 'POST',
        body: JSON.stringify({
            ingredients: items
        })
    })
        .then(checkResponse)
}
