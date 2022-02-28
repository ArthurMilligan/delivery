import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import style from "./constructor-item.module.css";

const ConstructorItem=(props)=>{
    return <div className={`${props.type?'pl-8':'pl-2'} ${style.item}`}>
        {!props.type && <DragIcon type="primary"/>}
        <ConstructorElement isLocked={props.isLocked}
                            type={props.type}
                            text={props.text}
                            price={props.price}
                            thumbnail={props.thumbnail}
                            />
    </div>
}

export default ConstructorItem