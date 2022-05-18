import { baseUrl } from "../../utils/url";
import { checkResponse } from "../../utils/check-response";
import { CLEAR_CART } from "./cart-actions";

export const CHANGE_ORDER_NUMBER = 'CHANGE_ORDER_NUMBER';
export const GET_ORDER = "GET_ORDER";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const GET_ORDER_SUCCESS_ACTION_CREATOR = (number, name) => {
    return {
        type: GET_ORDER_SUCCESS,
        number,
        name
    }
};

export const getOrder = (constructorDataToRequest) => dispatch => {
    const requestBody = { "ingredients": constructorDataToRequest }
    dispatch({
        type: GET_ORDER
    })
    fetch(baseUrl + '/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(checkResponse)
        .then(res => {
            if (res && res.success) {
                dispatch(GET_ORDER_SUCCESS_ACTION_CREATOR(res.order.number, res.name))
                dispatch({ type: CLEAR_CART })
            } else {
                dispatch({
                    type: GET_ORDER_FAILED
                })
            }
        }).catch(err => {
            console.log(err)
            dispatch({
                type: GET_ORDER_FAILED
            })
        })
}
