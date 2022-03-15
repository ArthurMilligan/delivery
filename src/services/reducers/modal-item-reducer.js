import { ADD_ITEM_INFORMATION, DELETE_ITEM_INFORMATION } from '../actions/modal-item-actions'

const initialState = {
    name: '',
    calories: '',
    proteins: '',
    fat: '',
    carbohydrates: '',
}

export const modalItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_INFORMATION: {
            return {
                ...state,
                name: action.name,
                calories: action.calories,
                proteins: action.proteins,
                fat: action.fat,
                carbohydrates: action.carbohydrates,
            }
        }
        case DELETE_ITEM_INFORMATION: {
            return {
                ...state,
                name: '',
                calories: '',
                proteins: '',
                fat: '',
                carbohydrates: '',
            }
        }
        default: {
            return state
        }
    }
}