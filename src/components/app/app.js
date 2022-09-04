import './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../../services/actions/ingredients';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LoginPage } from '../../pages/login';
import { RegisterPage } from '../../pages/register';
import { ResetPasswordPage } from '../../pages/reset-password';
import { ForgotPasswordPage } from '../../pages/forgot-password';
import { ProfilePage } from '../../pages/profile/profile';
import { NotFoundPage } from '../../pages/404';
import { LogoutPage } from '../../pages/logout';
import { ProtectedRoute } from '../route/protected-route';
import { getUser } from '../../services/actions/auth';
import { userSelectors } from '../../services/selectors/user';
import { IngredientDetailsById } from '../burger-ingredients/ingredient-details';


const App = () => {

  const dispatch = useDispatch()

  dispatch(getUser())

  useEffect(() => {
    dispatch(fetchIngredients())
  }, [])

  return (
    <BrowserRouter>
      <div className="App" >
        <AppHeader />
        <main>
          <Switch>
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
            <Route path='/ingredients/:id'>
              <IngredientDetailsById />
            </Route>
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App;
