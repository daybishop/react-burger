import { API } from "../../utils/constants"
import { TIngredient } from "../../utils/types"
import { doRequest, init, IResponseCommon } from "./common"

interface IResponseIngredients extends IResponseCommon {
    data: Array<TIngredient>
}

const INGREDIENTS = `${API}/ingredients`

export const fetchIngredientsData = async () => {
    return await doRequest<IResponseIngredients>(INGREDIENTS, {
        ...init,
        method: 'GET'
    })
}
