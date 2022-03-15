import React, { useEffect } from "react";
import style from './Ingredient-details.module.css'
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";

const IngredientDetails = ({ ...props }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({
            type: 'ADD_ITEM_INFORMATION',
            name: props.name,
            calories: props.calories,
            proteins: props.proteins,
            fat: props.fat,
            carbohydrates: props.carbohydrates
        })
        return () => dispatch({ type: 'DELETE_ITEM_INFORMATION' })
    }, [])
    return (
        <>
            <div className={`mr-10 mt-10 ml-10 ${style.header}`}>
                <span className="text text_type_main-large">Детали ингридиента</span>
            </div>
            <div className={`${style.content} mb-15`}>
                <img className={style.img} src={props.img} />
                <span className="text text_type_main-medium mt-4">{props.name}</span>

                <ul className="mt-8">
                    <li className="mr-5">
                        <span className="text text_type_main-default text_color_inactive">Калории,ккал</span>
                        <span className="text text_type_digits-default text_color_inactive">{props.calories}</span>
                    </li>
                    <li className="mr-5">
                        <span className="text text_type_main-default text_color_inactive">Белки, г</span>
                        <span className="text text_type_digits-default text_color_inactive">{props.proteins}</span>
                    </li>
                    <li className="mr-5">
                        <span className="text text_type_main-default text_color_inactive">Жиры, г</span>
                        <span className="text text_type_digits-default text_color_inactive">{props.fat}</span>
                    </li>
                    <li>
                        <span className="text text_type_main-default text_color_inactive">Углеводы, г</span>
                        <span className="text text_type_digits-default text_color_inactive">{props.carbohydrates}</span>
                    </li>
                </ul>
            </div>
        </>
    )
}

IngredientDetails.propTypes = {
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
}
export default IngredientDetails