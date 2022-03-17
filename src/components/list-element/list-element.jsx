import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import style from "./list-element.module.css";
import PropTypes from 'prop-types';
import { constructorDataType } from "../../utils/types";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";

const ListElement = (props) => {
    const [, dragRef] = useDrag({
        type: 'product',
        item: { id: props.id }
    })
    const cart = [...useSelector(store => store.cart.ingredients), useSelector(store => store.cart.bun)]
    const count = cart.reduce((acc, a) => a.name === props.name ? acc + 1 : acc, 0)
    const onClickEvent = () => {
        props.setModal(true);
        props.setCurrentIngredient({
            name: props.name,
            img: props.imgLarge,
            calories: props.calories,
            proteins: props.proteins,
            fat: props.fat,
            carbohydrates: props.carbohydrates
        })
    }
    return (
        <div className={`${style.item} mb-8 mr-6 pr-4 pl-4`} ref={dragRef} onClick={() => { onClickEvent() }}>
            {count > 0 && (<Counter count={count} size="default" />)}
            <img className={`${style.img} mb-1`} src={props.img} alt='burger' />
            <div>
                <span className="text text_type_digits-default mb-1">{props.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <span className={`${style.name} text text_type_main-small`}>{props.name}</span>
        </div>
    )
}

ListElement.propTypes = {
    setModal: PropTypes.func.isRequired,
    setCurrentIngredient: PropTypes.func.isRequired,
    imgLarge: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
}

export default ListElement