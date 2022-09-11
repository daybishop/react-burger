import { setOrderNumber, setOrderRequested, showOrder } from "../slices/constructor";
import PropTypes from 'prop-types';
import { saveOrderRequest } from "../api/orders";

export const getOrderNumber = (items) => dispatch => {
    dispatch(setOrderRequested(true))
    dispatch(showOrder())
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

getOrderNumber.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
}
