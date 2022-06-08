import { AppThunk, AppDispatch } from './../types/index';
import { baseUrl } from '../../utils/url';
import { checkResponse } from '../../utils/check-response';
import { CLEAR_CART } from '../constans/cart-constans';
import { GET_ORDER, GET_ORDER_FAILED, GET_ORDER_SUCCESS } from '../constans/order-constans';
import { getCookie } from '../../utils/cookie';

interface IGetOrderAction {
  readonly type: typeof GET_ORDER;
}
interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}
interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly number: number;
  readonly name: string;
}
export type TOrderActions = IGetOrderAction | IGetOrderFailedAction | IGetOrderSuccessAction;

export const GET_ORDER_SUCCESS_ACTION_CREATOR = (number: number, name: string) => {
  return {
    type: GET_ORDER_SUCCESS,
    number,
    name,
  };
};

export const getOrder: AppThunk = (constructorDataToRequest: Array<string>) => (dispatch: AppDispatch) => {
  const requestBody = { ingredients: constructorDataToRequest };
  const token = getCookie('accessToken') || '';
  dispatch({
    type: GET_ORDER,
  });
  fetch(baseUrl + '/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(requestBody),
  })
    .then(checkResponse)
    .then((res) => {
      if (res && res.success) {
        dispatch(GET_ORDER_SUCCESS_ACTION_CREATOR(res.order.number, res.name));
        dispatch({ type: CLEAR_CART });
      } else {
        dispatch({
          type: GET_ORDER_FAILED,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ORDER_FAILED,
      });
    });
};
