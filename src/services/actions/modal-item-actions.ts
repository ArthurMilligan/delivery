import { ADD_ITEM_INFORMATION, DELETE_ITEM_INFORMATION } from '../constans/modal-item-constans';

interface IAddItemInformationAction {
  readonly type: typeof ADD_ITEM_INFORMATION;
  readonly name: string;
  readonly calories: number;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
}
interface IDeleteItemInformationAction {
  readonly type: typeof DELETE_ITEM_INFORMATION;
}

export type TModalItemActions = IAddItemInformationAction | IDeleteItemInformationAction;

export const ADD_ITEM_INFORMATION_ACTION_CREATOR = (name: string, calories: number, proteins: number, fat: number, carbohydrates: number) => {
  return {
    type: ADD_ITEM_INFORMATION,
    name,
    calories,
    proteins,
    fat,
    carbohydrates,
  };
};
