import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { FC } from "react"
import styles from "./price.module.css"

interface IPrice {
    price: number
    count?: number
}

export const Price: FC<IPrice> = ({ price, count }) => {
    const priceString = count && count > 1 ? `${count} x ${price}` : `${price}`
    return (
        <div>
            <span className={`text text_type_digits-default ${styles.price}`}>{priceString}<CurrencyIcon type='primary' /></span>
        </div>
    )
} 