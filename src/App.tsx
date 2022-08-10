import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main>
        <BurgerIngredients />
        {/* <div style={{ width: "40px" }} /> */}
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
