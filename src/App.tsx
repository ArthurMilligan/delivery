import React, { useEffect, useState } from 'react';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-Ingredients/burger-Ingredients';
import style from './app.module.css'

function App() {
  const [cart, setCart] = useState([]);
  const [isFetching,setIsFetching] = useState(true)
  const [state, setState] = useState([]);
  const dataUrl = 'https://norma.nomoreparties.space/api/ingredients'
  useEffect(() => {
    fetch(dataUrl)
    .then(res=>res.json())
    .then(res=>{
      setState(res['data'])
      setIsFetching(false)
    })
  }, [])
  return (
    !isFetching?<>
      <AppHeader className={style.header} />
      <main className={style.main}>
        <BurgerIngredients data={state} setCart={setCart} />
        <BurgerConstructor data={state} cart={cart} />
      </main>
    </>:<div></div>
  );
}

export default App;
