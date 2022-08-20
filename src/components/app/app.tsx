import './app.module.css';
import AppHeader from '../../components/app-header/app-header';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { useEffect, useState } from 'react';
import { IngredientsDataContext } from '../services/ingredients-data-context';
import { INGREDIENTS } from '../common/constants';

function App() {
  const [ingredientsData, setIngredientsData] = useState([]);

  useEffect(() => {
    fetch(INGREDIENTS)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then(data => {
        if (data.success) {
          setIngredientsData(data.data)
        } else throw new Error("Error data loading");
      })
      .catch(e => {
        console.log(e)
      });
  }, [])

  return (
    <div className="App">
      <AppHeader />
      <main>
        <BurgerIngredients data={ingredientsData} />
        <IngredientsDataContext.Provider value={ingredientsData}>
          <BurgerConstructor />
        </IngredientsDataContext.Provider>
      </main>
    </div>
  );
}

export default App;
