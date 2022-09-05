import { useState } from "react";

export function useFormValues(initValues) {

    const [values, setValues] = useState(initValues)

    const handleChange = e => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    return { values, setValues, handleChange }
}