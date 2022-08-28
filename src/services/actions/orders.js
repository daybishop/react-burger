import { checkResponse } from "../../components/common/api";
import { ORDERS } from "../../utils/constants";
import { setOrderNumber, showOrder } from "../slices/constructor";
import PropTypes from 'prop-types';

export const getOrderNumber = (items) => dispatch => {
    fetch(ORDERS, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ingredients: items
        })
    })
        .then(checkResponse)
        .then(data => {
            if (data.success) {
                dispatch(setOrderNumber(data.order.number))
                dispatch(showOrder())
            } else throw new Error("Error data loading");
        })
        .catch(e => {
            console.log(e)
        })
};

getOrderNumber.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
};
