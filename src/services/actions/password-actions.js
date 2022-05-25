import { checkResponse } from '../../utils/check-response';
import { baseUrl } from '../../utils/url';

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';
export const FORGOT_PASSWORD_END = 'FORGOT_PASSWORD_END';

export const RESET_PASSSWORD = 'RESET_PASSWORD';
export const RESET_PASSSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const RESET_PASSSWORD_END = 'RESET_PASSSWORD_END';

const forgotPasswordUrl = baseUrl + '/password-reset';
const resetPasswordUrl = baseUrl + '/password-reset/reset';

export const forgotPassword = (email) => (dispatch) => {
  dispatch({ type: FORGOT_PASSWORD });
  fetch(forgotPasswordUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
    .then(checkResponse)
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
        });
        dispatch({
          type: FORGOT_PASSWORD_END,
        });
      } else {
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
        });
      }
      return res;
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: FORGOT_PASSWORD_FAILED,
      });
    });
};
export const resetPassword =
  ({ password, token }) =>
  (dispatch) => {
    dispatch({ type: RESET_PASSSWORD });
    fetch(resetPasswordUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, token }),
    })
      .then(checkResponse)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: RESET_PASSSWORD_SUCCESS,
          });
          dispatch({
            type: RESET_PASSSWORD_END,
          });
        } else {
          dispatch({
            type: RESET_PASSSWORD_FAILED,
          });
        }
        return res;
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: RESET_PASSSWORD_FAILED,
        });
      });
  };
