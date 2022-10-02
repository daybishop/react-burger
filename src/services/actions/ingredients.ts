import { hasError, ingredientsSlice } from "../slices/ingredients";
import { Dispatch } from "redux";
import { fetchIngredientsData } from "../api/ingredients";

const { startLoading, loadingSuccess } = ingredientsSlice.actions;

export const fetchIngredients = () => (dispatch: Dispatch) => {
    dispatch(startLoading())

    fetchIngredientsData()
        .then(data => {
            dispatch(loadingSuccess(data.data))
        })
        .catch(e => {
            console.log(e)
            dispatch(hasError(e))
        })
};
