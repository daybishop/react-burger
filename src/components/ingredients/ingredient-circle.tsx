import { FC } from "react"
import styles from "./ingredient-circle.module.css"
interface IIngredientCircle {
    image: string
}

export const IngredientCircle: FC<IIngredientCircle> = ({ image }) => {
    return (
        <div className={styles.border}>
            <img src={image} alt="" />
            {/* <span>+1</span> */}
        </div>
    )
}
