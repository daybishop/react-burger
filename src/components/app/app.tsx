import './app.module.css';
import AppHeader from '../app-header/app-header';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/actions/ingredients';
import { BrowserRouter } from 'react-router-dom';
import { ModalSwitch } from '../common/modal-switch';
import { useAppDispatch } from '../../utils/hooks';

const App = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchIngredients())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BrowserRouter>
      <div className="App" >
        <AppHeader />
        <main>
          <ModalSwitch />
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App;
