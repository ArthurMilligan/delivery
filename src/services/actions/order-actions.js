import axios from "axios";

export const CHANGE_ORDER_NUMBER = 'CHANGE_ORDER_NUMBER';
export const GET_ORDER = "GET_ORDER";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

export const getOrder = (constructorDataToRequest) => dispatch => {
    dispatch({
        type: GET_ORDER
    })
    axios.post('https://norma.nomoreparties.space/api/orders', { "ingredients": constructorDataToRequest })
        .then(res => {
            if (res && res.status === 200) {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    number: res.data.order.number,
                    name: res.data.name
                })
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
