import { useEffect } from "react";
import style from './Ingredient-details.module.css'
import { useDispatch, useSelector } from "react-redux";
import { ADD_ITEM_INFORMATION_ACTION_CREATOR, DELETE_ITEM_INFORMATION } from "../../services/actions/modal-item-actions";
import { useParams } from "react-router-dom";
import { getItems } from "../../services/actions/items-actions";
import NotFound404 from "../../pages/not-found-404/not-found-404";


const IngredientDetails = ({ ...props }) => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const ingredients = useSelector(store => store.items.items)
    const currentIngredient = ingredients.filter(ingredient => ingredient._id === id)[0]
    useEffect(() => {
        if (!ingredients.length){
            dispatch(getItems())
        }else{
            if(currentIngredient){
                dispatch(ADD_ITEM_INFORMATION_ACTION_CREATOR(currentIngredient.name, currentIngredient.calories, currentIngredient.proteins, currentIngredient.fat, currentIngredient.carbohydrates))
            }
        }
        return () => dispatch({ type: DELETE_ITEM_INFORMATION })
    }, [currentIngredient, ingredients])
    if(!currentIngredient){
        return(<NotFound404/>)
    }
    return (ingredients.length?(
        <div className={style.mainBlock}>
            <div className={`mr-10 mt-10 ml-10 ${style.header}`}>
                <span className="text text_type_main-large">Детали ингридиента</span>
            </div>
            <div className={`${style.content} mb-15`}>
                <img className={style.img} src={currentIngredient.image_large} />
                <span className="text text_type_main-medium mt-4">{currentIngredient.name}</span>

                <ul className={`${style.list} mt-8`} >
                    <li className={`${style.listElement} mr-5`}>
                        <span className="text text_type_main-default text_color_inactive">Калории,ккал</span>
                        <span className="text text_type_digits-default text_color_inactive">{currentIngredient.calories}</span>
                    </li>
                    <li className={`${style.listElement} mr-5`}>
                        <span className="text text_type_main-default text_color_inactive">Белки, г</span>
                        <span className="text text_type_digits-default text_color_inactive">{currentIngredient.proteins}</span>
                    </li>
                    <li className={`${style.listElement} mr-5`}>
                        <span className="text text_type_main-default text_color_inactive">Жиры, г</span>
                        <span className="text text_type_digits-default text_color_inactive">{currentIngredient.fat}</span>
                    </li>
                    <li className={`${style.listElement}`}>
                        <span className="text text_type_main-default text_color_inactive">Углеводы, г</span>
                        <span className="text text_type_digits-default text_color_inactive">{currentIngredient.carbohydrates}</span>
                    </li>
                </ul>
            </div>
        </div>)
        :(<div></div>)
    )
}

export default IngredientDetails