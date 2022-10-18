import { setOrderNumber, setOrderRequested, showOrder } from "../slices/constructor";
import { saveOrderRequest } from "../api/orders";
import { TAppDispatch } from "../../store";

export const getOrderNumber = (items: Array<string>) => (dispatch: TAppDispatch) => {
    dispatch(setOrderRequested(true))
    dispatch(showOrder(''))
    saveOrderRequest(items)
        .then(data => {
            dispatch(setOrderNumber(data.order.number))
        })
        .catch(e => {
            console.log(e)
        })
        .finally(() => {
            dispatch(setOrderRequested(false))
        })
}
