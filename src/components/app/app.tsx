import './app.module.css';
import AppHeader from '../../components/app-header/app-header';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { useEffect, useState } from 'react';

const API = "https://norma.nomoreparties.space/api"
const INGREDIENTS = `${API}/ingredients`

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
        <BurgerConstructor data={ingredientsData} />
      </main>
    </div>
  );
}

export default App;
