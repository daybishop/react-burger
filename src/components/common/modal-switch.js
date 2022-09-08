import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { NotFoundPage } from "../../pages/404";
import { ForgotPasswordPage } from "../../pages/forgot-password";
import { LoginPage } from "../../pages/login";
import { LogoutPage } from "../../pages/logout";
import { ProfilePage } from "../../pages/profile/profile";
import { RegisterPage } from "../../pages/register";
import { ResetPasswordPage } from "../../pages/reset-password";
import { ingredientsSelectors } from "../../services/selectors/ingredients";
import { clearSelectedItem } from "../../services/slices/ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import IngredientDetails, { IngredientDetailsById } from "../burger-ingredients/ingredient-details";
import { ProtectedRoute } from "../route/protected-route";
import Modal from "./modal";

export const ModalSwitch = () => {

    const location = useLocation()
    const history = useHistory()
    const selectedItem = useSelector(ingredientsSelectors.selectedItem)

    const background = location && location.state && location.state.background;

    const dispatch = useDispatch()
    const hideModal = () => {
        dispatch(clearSelectedItem())
        history.goBack()
    }

    return (
        <>
            <Switch location={background || location}>
                <Route path='/' exact >
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </DndProvider>
                </Route>
                <Route path='/login'>
                    <LoginPage />
                </Route>
                <Route path='/logout'>
                    <LogoutPage />
                </Route>
                <Route path='/register'>
                    <RegisterPage />
                </Route>
                <Route path='/reset-password'>
                    <ResetPasswordPage />
                </Route>
                <Route path='/forgot-password'>
                    <ForgotPasswordPage />
                </Route>
                <ProtectedRoute path='/profile'>
                    <ProfilePage />
                </ProtectedRoute>
                <Route path="/ingredients/:id" children={<IngredientDetailsById />} />
                <Route>
                    <NotFoundPage />
                </Route>
            </Switch>
            {background && <Route path="/ingredients/:id" children={
                <Modal show={true} header="Детали ингредиента" handleClose={hideModal}>
                    <IngredientDetails item={selectedItem} />
                </Modal>
            } />
            }
        </>
    )
}