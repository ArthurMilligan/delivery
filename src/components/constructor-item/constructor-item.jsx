import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import style from "./constructor-item.module.css";
import PropTypes from 'prop-types';


const ConstructorItem=(props)=>{
    const handleClose = () => props.setConstructorData(props.constructorData.filter(i=>i.id!==props.id))
    return <div className={`${props.type?'pl-8':'pl-2'} ${style.item} mb-4`}>
        {!props.type && <DragIcon type="primary"/>}
        <ConstructorElement isLocked={props.isLocked}
                            type={props.type}
                            text={props.text}
                            price={props.price}
                            thumbnail={props.thumbnail}
                            handleClose={handleClose}
                            />
    </div>
}

ConstructorItem.propTypes={
    setConstructorData:PropTypes.func,
    constructorData:PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.number.isRequired,
        name:PropTypes.string.isRequired,
        price:PropTypes.number.isRequired,
        thumbnail:PropTypes.string.isRequired
      }).isRequired),
    type:PropTypes.string,
    isLocked:PropTypes.bool,
    text:PropTypes.string.isRequired,
    price:PropTypes.number.isRequired,
    thumbnail:PropTypes.string.isRequired,
    id:PropTypes.number
}
export default ConstructorItem