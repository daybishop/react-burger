import BurgerConstructor from "../components/burger-constructor/burger-constructor"
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients"

export const MainPage = () => {
    return (
        <>
            <p className="text text_type_main-large pt-10 pb-5">
                Соберите бургер
            </p>
            <div className="two_panels">
                <BurgerIngredients />
                <BurgerConstructor />
            </div>
        </>
    )
}