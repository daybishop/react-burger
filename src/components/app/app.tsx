import './app.module.css';
import AppHeader from '../../components/app-header/app-header';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { useEffect } from 'react';
import { INGREDIENTS } from '../../utils/constants';
import { checkResponse } from '../common/api';
import { startLoading, loadingSuccess, hasError } from '../../services/slices/ingredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch } from 'react-redux';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startLoading())
    fetch(INGREDIENTS)
      .then(res => checkResponse(res))
      .then(data => {
        dispatch(loadingSuccess(data.data))
      })
      .catch(e => {
        console.log(e)
        dispatch(hasError(e))
      })
  }, [dispatch])


  return (
    <div className="App">
      <AppHeader />
      <main>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  );
}

export default App;
