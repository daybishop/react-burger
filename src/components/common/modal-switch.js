import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { NotFoundPage } from "../../pages/404";
import { ForgotPasswordPage } from "../../pages/forgot-password";
import { LoginPage } from "../../pages/login";
import { LogoutPage } from "../../pages/logout";
import { ProfilePage } from "../../pages/profile/profile";
import { RegisterPage } from "../../pages/register";
import { ResetPasswordPage } from "../../pages/reset-password";
import { clearSelectedItem } from "../../services/slices/ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import IngredientDetails from "../burger-ingredients/ingredient-details";
import { AnonymousRoute } from "../route/anonymous-route";
import { ProtectedRoute } from "../route/protected-route";
import Modal from "./modal";

export const ModalSwitch = () => {

    const location = useLocation()
    const history = useHistory()

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
                <AnonymousRoute path='/login'>
                    <LoginPage />
                </AnonymousRoute>
                <Route path='/logout'>
                    <LogoutPage />
                </Route>
                <AnonymousRoute path='/register'>
                    <RegisterPage />
                </AnonymousRoute>
                <AnonymousRoute path='/reset-password'>
                    <ResetPasswordPage />
                </AnonymousRoute>
                <AnonymousRoute path='/forgot-password'>
                    <ForgotPasswordPage />
                </AnonymousRoute>
                <ProtectedRoute path='/profile'>
                    <ProfilePage />
                </ProtectedRoute>
                <Route path="/ingredients/:id" children={<IngredientDetails />} />
                <Route>
                    <NotFoundPage />
                </Route>
            </Switch>
            {background &&
                <Route path="/ingredients/:id" children={
                    <Modal show={true} header="Детали ингредиента" handleClose={hideModal}>
                        <IngredientDetails />
                    </Modal>
                } />
            }
        </>
    )
}