import { CurrencyIcon,Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import style from "./list-element.module.css";

const ListElement=(props)=>{
    return(
        <div className={`${style.item} mb-8 mr-6 pr-4 pl-4`} onClick={()=>console.log(props.id)}>
            {props.__v&&<Counter count={props.__v} size="default" />}
            <img className={`${style.img} mb-1`} src={props.img} alt='burger'/>
            <div className="mb-1">
                <span>{props.price}</span>
                <CurrencyIcon type="primary"/>
            </div>
            <span className={style.name}>{props.name}</span>
        </div>
    )
}
export default ListElement