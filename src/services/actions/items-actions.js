import { checkResponse } from '../../utils/check-response';
import { baseUrl } from '../../utils/url';
export const GET_ITEMS = 'GET_ITEMS';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

const dataUrl = baseUrl + '/ingredients';
export const getItems = () => (dispatch) => {
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
