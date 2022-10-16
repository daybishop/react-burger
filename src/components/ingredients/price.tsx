import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { FC } from "react"
import styles from "./price.module.css"

interface IPrice {
    price: number
}

export const Price: FC<IPrice> = ({ price }) => {
    return (
        <div>
            <span className={`text text_type_digits-default ${styles.price}`}>{price}<CurrencyIcon type='primary' /></span>
        </div>
    )
} 