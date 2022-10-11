import { shape, string, number, oneOf } from 'prop-types';

export const ingredientType = shape({
    _id: string.isRequired,
    name: string.isRequired,
    type: oneOf(["bun", "sauce", "main"]).isRequired,
    proteins: number.isRequired,
    fat: number.isRequired,
    carbohydrates: number.isRequired,
    calories: number.isRequired,
    price: number.isRequired,
    image: string.isRequired,
    image_mobile: string.isRequired,
    image_large: string.isRequired,
    __v: number.isRequired
});

export type TIngredientType = "bun" | "sauce" | "main"

export type TBunType = "top" | "bottom"

export type TIngredient = {
    readonly _id: string
    readonly name: string
    readonly type: TIngredientType
    readonly proteins: number
    readonly fat: number
    readonly carbohydrates: number
    readonly calories: number
    readonly price: number
    readonly image: string
    readonly image_mobile: string
    readonly image_large: string
    readonly __v: number
}

export type TIngredientWithUUID = TIngredient & { uuid: string }

export interface IForm {
    [key: string]: string
}
