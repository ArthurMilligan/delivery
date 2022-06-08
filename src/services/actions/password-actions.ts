import { AppThunk, AppDispatch } from './../types/index';
import { checkResponse } from '../../utils/check-response';
import {
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_END,
  RESET_PASSSWORD,
  RESET_PASSSWORD_SUCCESS,
  RESET_PASSSWORD_END,
  RESET_PASSSWORD_FAILED,
  forgotPasswordUrl,
  resetPasswordUrl,
} from '../constans/password-constans';

interface IForgotPasswordAction {
  readonly type: typeof FORGOT_PASSWORD;
}
interface IForgotPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}
interface IForgotPasswordFailedAction {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}
interface IForgotPasswordEndAction {
  readonly type: typeof FORGOT_PASSWORD_END;
}
interface IResetPasswordAction {
  readonly type: typeof RESET_PASSSWORD;
}
interface IResetPassworSuccessdAction {
  readonly type: typeof RESET_PASSSWORD_SUCCESS;
}
interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSSWORD_FAILED;
}
interface IResetPasswordEndAction {
  readonly type: typeof RESET_PASSSWORD_END;
}
export type TPasswordActions =
  | IForgotPasswordAction
  | IForgotPasswordEndAction
  | IForgotPasswordFailedAction
  | IForgotPasswordSuccessAction
  | IResetPassworSuccessdAction
  | IResetPasswordAction
  | IResetPasswordEndAction
  | IResetPasswordFailedAction;

export const forgotPassword: AppThunk = (email: string) => (dispatch: AppDispatch) => {
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
export const resetPassword: AppThunk =
  ({ password, token }: { password: string; token: string }) =>
  (dispatch: AppDispatch) => {
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
