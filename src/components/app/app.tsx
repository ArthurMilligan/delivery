import React, { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-Ingredients/burger-Ingredients';
import style from './app.module.css'

function App() {
  const [constructorData, setConstructorData] = useState([
    {
      id: 0,
      name: "Филе Люминесцентного тетраодонтимформа",
      price: 988,
      thumbnail: "https://code.s3.yandex.net/react/code/meat-03.png",
    },
    {
      id: 1,
      name: "Мясо бессмертных моллюсков Protostomia",
      price: 1337,
      thumbnail: "https://code.s3.yandex.net/react/code/meat-02.png",
    },
    {
      id: 2,
      name: "Филе Люминесцентного тетраодонтимформа",
      price: 988,
      thumbnail: "https://code.s3.yandex.net/react/code/meat-03.png",
    },
    {
      id: 3,
      name: "Мясо бессмертных моллюсков Protostomia",
      price: 1337,
      thumbnail: "https://code.s3.yandex.net/react/code/meat-02.png",
    },
    {
      id: 4,
      name: "Филе Люминесцентного тетраодонтимформа",
      price: 988,
      thumbnail: "https://code.s3.yandex.net/react/code/meat-03.png",
    },
  ]);

  const [isFetching, setIsFetching] = useState(true);
  const [state, setState] = useState([]);


  const dataUrl = 'https://norma.nomoreparties.space/api/ingredients'

  useEffect(() => {
    try {
      fetch(dataUrl)
        .then(res => res.json())
        .then(res => {
          setState(res['data'])
          setIsFetching(false)
        })
    } catch {
      alert('Ошибка(')
    }
  }, [])

  return (
    !isFetching ? (<>
      <AppHeader className={style.header} />
      <main className={style.main}>
        <BurgerIngredients data={state} constructorData={constructorData} />
        <BurgerConstructor constructorData={constructorData} />
      </main>
    </>) : (<div></div>)
  );
}


export default App;
