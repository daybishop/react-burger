import './app.module.css';
import AppHeader from '../app-header/app-header';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchIngredients } from '../../services/actions/ingredients';
import { BrowserRouter } from 'react-router-dom';
import { ModalSwitch } from '../common/modal-switch';

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch<any>(fetchIngredients())
  }, [])

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
