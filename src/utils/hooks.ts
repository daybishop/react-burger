import { ChangeEvent, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { TAppDispatch, TRootState } from "../store";
import { IForm } from "./types";

export function useFormValues(initValues: IForm) {

    const [values, setValues] = useState<IForm>(initValues)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    return { values, setValues, handleChange }
}

export const useAppDispatch: () => TAppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector