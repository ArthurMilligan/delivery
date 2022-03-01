import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import style from './app-header.module.css'

const AppHeader=(props)=>{
    return(
        <header className={style.header}>
            <div className={style.headerContainer}>
                <div className={`${style.menu} mb-4 mt-4`}>
                    <div className={`${style.menuItem} mr-8 pr-5 pl-5`}>
                        <BurgerIcon className={`${style.menuItemIcon} `} type="primary"/>
                        <span className={`${style.menuItemText} ml-2 text text_type_main-default`}>Конструктор</span>
                    </div>
                    <div className={`${style.menuItem} mr-8 pr-5 pl-5`}>
                        <ListIcon className={`${style.menuItemIcon} `} type="secondary"/>
                        <span className={`${style.menuItemText} ml-2 text text_type_main-default text_color_inactive`}>Лента заказов</span>
                    </div>
                </div>
                <Logo/>
                <div className={`${style.menuItem} mr-8 pr-5 pl-5 ${style.lk}`}>
                    <ProfileIcon className={`${style.menuItemIcon} `} type="secondary"/>
                    <span className={`${style.menuItemText} ml-2 text text_type_main-default text_color_inactive`}>Личный кабинет</span>
                </div>
            </div>
        </header>
    )
}
export default AppHeader