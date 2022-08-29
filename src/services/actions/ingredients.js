import { checkResponse } from "../../components/common/api";
import { INGREDIENTS } from "../../utils/constants";
import { hasError, ingredientsSlice } from "../slices/ingredients";

const { startLoading, loadingSuccess } = ingredientsSlice.actions;

export const fetchIngredients = () => dispatch => {

    dispatch(startLoading())
    fetch(INGREDIENTS)
        .then(checkResponse)
        .then(data => {
            dispatch(loadingSuccess(data.data))
        })
        .catch(e => {
            console.log(e)
            dispatch(hasError(e))
        })
};
