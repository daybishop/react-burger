import { ChangeEvent, useState } from "react";
import { IForm } from "./types";

export function useFormValues(initValues: IForm) {

    const [values, setValues] = useState<IForm>(initValues)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    return { values, setValues, handleChange }
}
