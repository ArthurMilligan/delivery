import React, { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-Ingredients/burger-Ingredients';
import style from './app.module.css'
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux'
import { getItems } from '../../services/actions/items-actions'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();

  const responseStatus = useSelector((store: RootStateOrAny) => ({
    itemsRequest: store.items.itemsRequest,
    itemsRequestFailed: store.items.itemsRequestFailed
  }))

  useEffect(() => {
    dispatch(getItems())
  }, [])

  return (
    !responseStatus.itemsRequest && !responseStatus.itemsRequestFailed ? (<>
      <AppHeader className={style.header} />
      <main className={style.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </>) : (<div></div>)
  );
}


export default App;
