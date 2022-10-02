import { API } from "../../utils/constants"
import { fetchWithToken, init, IResponseCommon } from "./common"

interface IResponseOrder extends IResponseCommon {
    name: string
    order: {
        number: number
    }
}

const ORDERS = `${API}/orders`

export const saveOrderRequest = async (items: Array<string>) => {
    return await fetchWithToken<IResponseOrder>(ORDERS, {
        ...init,
        method: 'POST',
        body: JSON.stringify({
            ingredients: items
        })
    })
}
