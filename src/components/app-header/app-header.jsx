import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import style from './app-header.module.css'

const AppHeader=(props)=>{
    return(
        <header className={style.header}>
            <div className={style.headerContainer}>
                <div className={style.menu}>
                    <div className={style.menuItem}>
                        <BurgerIcon className={style.menuItemIcon} type="primary"/>
                        <span className={style.menuItemText}>Конструктор</span>
                    </div>
                    <div className={style.menuItem}>
                        <ListIcon className={style.menuItemIcon} type="primary"/>
                        <span className={style.menuItemText}>Лента заказов</span>
                    </div>
                </div>
                <Logo/>
                <div className={`${style.menuItem} ${style.lk}`}>
                    <ProfileIcon className={style.menuItemIcon} type="primary"/>
                    <span className={style.menuItemText}>Личный кабинет</span>
                </div>
            </div>
        </header>
    )
}
export default AppHeader