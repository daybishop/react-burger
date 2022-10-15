import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { NotFoundPage } from "../../pages/404";
import { ForgotPasswordPage } from "../../pages/forgot-password";
import { LoginPage } from "../../pages/login";
import { LogoutPage } from "../../pages/logout";
import { MainPage } from "../../pages/main";
import { ProfilePage } from "../../pages/profile/profile";
import { RegisterPage } from "../../pages/register";
import { ResetPasswordPage } from "../../pages/reset-password";
import { clearSelectedItem } from "../../services/slices/ingredients";
import IngredientDetails from "../burger-ingredients/ingredient-details";
import { AnonymousRoute } from "../route/anonymous-route";
import { ProtectedRoute } from "../route/protected-route";
import Modal from "./modal";

interface IState {
    background: any
}

export const ModalSwitch = () => {

    const location = useLocation<IState>()
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
                        <MainPage />
                    </DndProvider>
                </Route>
                <Route path='/logout' component={LogoutPage} />
                <AnonymousRoute path='/login' component={LoginPage} />
                <AnonymousRoute path='/register' component={RegisterPage} />
                <AnonymousRoute path='/reset-password' component={ResetPasswordPage} />
                <AnonymousRoute path='/forgot-password' component={ForgotPasswordPage} />
                <ProtectedRoute path='/profile' component={ProfilePage} />
                <Route path="/ingredients/:id" component={IngredientDetails} />
                <Route component={NotFoundPage} />
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