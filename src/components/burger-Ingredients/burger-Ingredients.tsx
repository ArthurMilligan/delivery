import React, { FC, useRef, useState } from 'react';
import SwitchPanel from '../switch-panel/switch-panel';
import ListElement from '../list-element/list-element';
import style from './burger-Ingredients.module.css';
import { useSelector } from 'react-redux';
import { IItem } from '../../utils/types';

const BurgerIngredients: FC = (props) => {
  const [currentSwitchPanel, setCurrentSwitchPanel] = useState<string>('');
  const items: Array<IItem> = useSelector((store: any) => store.items.items);
  const switchPanelCheckPoint = useRef<HTMLInputElement>(null);
  const buns = useRef<HTMLInputElement>(null);
  const sauces = useRef<HTMLInputElement>(null);
  const mains = useRef<HTMLInputElement>(null);

  const handleScroll = (e: any) => {
    const tmp = [buns, sauces, mains];
    let current = '',
      flag = 10000;
    tmp.forEach((i, number) => {
      if (
        i.current !== null &&
        switchPanelCheckPoint.current !== null &&
        Math.abs(
          i.current.getBoundingClientRect().y -
            switchPanelCheckPoint.current.getBoundingClientRect().y
        ) < flag
      ) {
        current = `${number}`;
        flag = Math.abs(
          i.current.getBoundingClientRect().y -
            switchPanelCheckPoint.current.getBoundingClientRect().y
        );
      }
    });
    setCurrentSwitchPanel(current);
  };
  return (
    <section className={style.section}>
      <h1 className='mb-5 mt-10 text text_type_main-large'>Соберите бургер</h1>
      <div className='mb-10'>
        <SwitchPanel
          currentSwitchPanel={currentSwitchPanel}
          setCurrentSwitchPanel={setCurrentSwitchPanel}
        />
      </div>
      <div
        className={style.sectionList}
        onScroll={handleScroll}
        ref={switchPanelCheckPoint}
      >
        <h2 ref={buns} className='mb-6 mt-10 text text_type_main-medium'>
          Булки
        </h2>
        <div className={`${style.sectionListItems} pl-4`}>
          {items.map((i) => {
            if (i.type === 'bun')
              return (
                <ListElement
                  id={i._id}
                  key={i._id}
                  img={i.image}
                  price={i.price}
                  name={i.name}
                />
              );
            else return null;
          })}
        </div>
        <h2 ref={sauces} className='mb-6 mt-2 text text_type_main-medium'>
          Соусы
        </h2>
        <div className={`${style.sectionListItems} pl-4`}>
          {items.map((i) => {
            if (i.type === 'sauce')
              return (
                <ListElement
                  id={i._id}
                  key={i._id}
                  img={i.image}
                  price={i.price}
                  name={i.name}
                />
              );
            else return null;
          })}
        </div>
        <h2 ref={mains} className='mb-6 mt-2 text text_type_main-medium'>
          Начинки
        </h2>
        <div className={`${style.sectionListItems} pl-4`}>
          {items.map((i) => {
            if (i.type === 'main')
              return (
                <ListElement
                  id={i._id}
                  key={i._id}
                  img={i.image}
                  price={i.price}
                  name={i.name}
                />
              );
            else return null;
          })}
        </div>
      </div>
    </section>
  );
};
export default BurgerIngredients;
