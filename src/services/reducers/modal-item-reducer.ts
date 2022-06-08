import { IModalItemState } from '../types/modal-item-reducers-types';
import { TModalItemActions } from './../actions/modal-item-actions';
import { ADD_ITEM_INFORMATION, DELETE_ITEM_INFORMATION } from '../constans/modal-item-constans';

const initialState: IModalItemState = {
  name: '',
  calories: 0,
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
};

export const modalItemReducer = (state = initialState, action: TModalItemActions): IModalItemState => {
  switch (action.type) {
    case ADD_ITEM_INFORMATION: {
      return {
        ...state,
        name: action.name,
        calories: action.calories,
        proteins: action.proteins,
        fat: action.fat,
        carbohydrates: action.carbohydrates,
      };
    }
    case DELETE_ITEM_INFORMATION: {
      return {
        ...state,
        name: '',
        calories: 0,
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
      };
    }
    default: {
      return state;
    }
  }
};
