import { hasError, ingredientsSlice } from "../slices/ingredients";
import { fetchIngredientsData } from "../api/ingredients";
import { TAppDispatch } from "../../store";

const { startLoading, loadingSuccess } = ingredientsSlice.actions;

export const fetchIngredients = () => (dispatch: TAppDispatch) => {
    dispatch(startLoading(''))

    fetchIngredientsData()
        .then(data => {
            dispatch(loadingSuccess(data.data))
        })
        .catch(e => {
            console.log(e)
            dispatch(hasError(e))
        })
};
