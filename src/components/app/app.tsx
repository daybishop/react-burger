import './app.module.css';
import AppHeader from '../../components/app-header/app-header';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { useEffect, useState } from 'react';
import { IngredientsDataContext } from '../../services/ingredients-data-context';
import { INGREDIENTS } from '../../utils/constants';
import { checkResponse } from '../common/api';


function App() {
  const [ingredientsData, setIngredientsData] = useState([]);

  useEffect(() => {
    fetch(INGREDIENTS)
      .then(res => checkResponse(res))
      .then(data => {
        setIngredientsData(data.data)
      })
  }, [])

  return (
    <div className="App">
      <AppHeader />
      <main>
        <IngredientsDataContext.Provider value={ingredientsData}>
          <BurgerIngredients />
          <BurgerConstructor />
        </IngredientsDataContext.Provider>
      </main>
    </div>
  );
}

export default App;
