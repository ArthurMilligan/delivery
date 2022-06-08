import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import style from './app-header.module.css';

const AppHeader: FC = () => {
  return (
    <header className={style.header}>
      <nav className={style.headerContainer}>
        <div className={`${style.menu} mb-4 mt-4`}>
          <div className={`${style.menuItem} mr-8 pr-5 pl-5`}>
            <BurgerIcon type='primary' />
            <NavLink
              exact
              to={{ pathname: `/` }}
              className={`${style.menuItemText} ml-2 text text_type_main-default text_color_inactive`}
              activeClassName={style.active}
            >
              Конструктор
            </NavLink>
          </div>
          <div className={`${style.menuItem} mr-8 pr-5 pl-5`}>
            <ListIcon type='secondary' />
            <NavLink
              to={{ pathname: `/feed` }}
              className={`${style.menuItemText} ml-2 text text_type_main-default text_color_inactive`}
              activeClassName={style.active}
            >
              Лента заказов
            </NavLink>
          </div>
        </div>
        <NavLink to={{ pathname: `/` }}>
          <Logo />
        </NavLink>
        <div className={`${style.menuItem} mr-8 pr-5 pl-5 ${style.lk}`}>
          <ProfileIcon type='secondary' />
          <NavLink
            to={{ pathname: `/profile` }}
            className={`${style.menuItemText} ml-2 text text_type_main-default text_color_inactive`}
            activeClassName={style.active}
          >
            Личный кабинет
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
export default AppHeader;
