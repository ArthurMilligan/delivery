import { AppThunk, AppDispatch } from './../types/index';
import { GET_ITEMS, GET_ITEMS_FAILED, GET_ITEMS_SUCCESS } from './../constans/items-actions-constans';
import { checkResponse } from '../../utils/check-response';
import { baseUrl } from '../../utils/url';

export type TGetItemsAction = {
  readonly type: typeof GET_ITEMS;
};
export type TGetItemsFailedAction = {
  readonly type: typeof GET_ITEMS_FAILED;
};
export type TGetItemsSuccessAction = {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly items: Array<IItem>;
};
export interface IItem {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}
export type TItemsActions = TGetItemsAction | TGetItemsFailedAction | TGetItemsSuccessAction;

const dataUrl = baseUrl + '/ingredients';
export const getItems: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_ITEMS,
  });
  fetch(dataUrl)
    .then(checkResponse)
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: res.data,
        });
      } else {
        dispatch({
          type: GET_ITEMS_FAILED,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ITEMS_FAILED,
      });
    });
};
