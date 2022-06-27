import { AppThunk } from './../types/index';
import { checkResponse } from '../../utils/check-response';
import { baseUrl } from '../../utils/url';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import {
  REGISTRATION,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_END,
  GET_USER_INFORMATION,
  GET_USER_INFORMATION_SUCCESS,
  GET_USER_INFORMATION_FAILED,
  UPDATE_TOKEN,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_TOKEN_FAILED,
  UPDATE_USER_INFORMATION,
  UPDATE_USER_INFORMATION_SUCCESS,
  UPDATE_USER_INFORMATION_FAILED,
  LOGOUT,
} from '../constans/auth-constans';

export interface IRegistragionAction {
  readonly type: typeof REGISTRATION;
}
export interface IRegistrationSuccessAction {
  readonly type: typeof REGISTRATION_SUCCESS;
  readonly email: string;
  readonly name: string;
}
export interface IRegistrationFailedAction {
  readonly type: typeof REGISTRATION_FAILED;
}
export interface ILoginAction {
  readonly type: typeof LOGIN;
}
export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  readonly email: string;
  readonly name: string;
}
export interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED;
}
export interface ILoginEndAction {
  readonly type: typeof LOGIN_END;
}
export interface IGetUserInformationAction {
  readonly type: typeof GET_USER_INFORMATION;
}
export interface IGetUserInformationSuccessAction {
  readonly type: typeof GET_USER_INFORMATION_SUCCESS;
  readonly email: string;
  readonly name: string;
}
export interface IGetUserInformationFailedAction {
  readonly type: typeof GET_USER_INFORMATION_FAILED;
}
export interface IUpdateTokenAction {
  readonly type: typeof UPDATE_TOKEN;
}
export interface IUpdateTokenSuccessAction {
  readonly type: typeof UPDATE_TOKEN_SUCCESS;
}
export interface IUpdateTokenFailedAction {
  readonly type: typeof UPDATE_TOKEN_FAILED;
}
export interface IUpdateUserInformationAction {
  readonly type: typeof UPDATE_USER_INFORMATION;
}
export interface IUpdateUserInformationSuccessAction {
  readonly type: typeof UPDATE_USER_INFORMATION_SUCCESS;
  readonly email: string;
  readonly name: string;
}
export interface IUpdateUserInformationFailedAction {
  readonly type: typeof UPDATE_USER_INFORMATION_FAILED;
}
export interface ILogoutAction {
  readonly type: typeof LOGOUT;
}
export type TAuthActions =
  | IRegistragionAction
  | IRegistrationSuccessAction
  | IRegistrationFailedAction
  | ILoginAction
  | ILoginSuccessAction
  | ILoginFailedAction
  | ILoginEndAction
  | IGetUserInformationAction
  | IGetUserInformationSuccessAction
  | IGetUserInformationFailedAction
  | IUpdateTokenAction
  | IUpdateTokenSuccessAction
  | IUpdateTokenFailedAction
  | IUpdateUserInformationAction
  | IUpdateUserInformationSuccessAction
  | IUpdateUserInformationFailedAction
  | ILogoutAction;

const registrationUrl = baseUrl + '/auth/register';
const loginUrl = baseUrl + '/auth/login';
const userInformationUrl = baseUrl + '/auth/user';
const updateTokenUrl = baseUrl + '/auth/token';
const logoutUrl = baseUrl + '/auth/logout';

export const registration: AppThunk =
  ({ email, password, name }: { email: string; password: string; name: string }) =>
  (dispatch) => {
    const requestBody = {
      email: email,
      password: password,
      name: name,
    };
    dispatch({ type: REGISTRATION });
    return fetch(registrationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(checkResponse)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: REGISTRATION_SUCCESS,
            name: res.user.name,
            email: res.user.email,
          });
        } else {
          dispatch({
            type: REGISTRATION_FAILED,
          });
        }
        return res;
      })
      .then((res) => {
        if (res.refreshToken && res.accessToken) {
          setCookie(`refreshToken`, res.refreshToken);
          setCookie(`accessToken`, res.accessToken);
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: REGISTRATION_FAILED,
        });
      });
  };

export const login: AppThunk =
  ({ email, password }: { email: string; password: string }) =>
  (dispatch) => {
    const requestBody = {
      email: email,
      password: password,
    };
    dispatch({ type: LOGIN });
    fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(checkResponse)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: LOGIN_SUCCESS,
            name: res.user.name,
            email: res.user.email,
          });
          dispatch({
            type: LOGIN_END,
          });
        } else {
          dispatch({
            type: LOGIN_FAILED,
          });
        }
        return res;
      })
      .then((res) => {
        if (res.refreshToken && res.accessToken) {
          setCookie(`refreshToken`, res.refreshToken);
          setCookie(`accessToken`, res.accessToken);
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: LOGIN_FAILED,
        });
      });
  };

export const getUserInformation: AppThunk = () => (dispatch) => {
  const token = getCookie('accessToken');
  if (!token) {
    dispatch({
      type: GET_USER_INFORMATION_FAILED,
    });
  } else {
    dispatch({ type: GET_USER_INFORMATION });
    fetch(userInformationUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then(checkResponse)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_INFORMATION_SUCCESS,
            name: res.user.name,
            email: res.user.email,
          });
        } else {
          dispatch({
            type: GET_USER_INFORMATION_FAILED,
          });
        }
        return res;
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_USER_INFORMATION_FAILED,
        });
      });
  }
};

export const updateUserInformation: AppThunk =
  ({ email, name, password }: { email: string; password: string; name: string }) =>
  (dispatch) => {
    const token = getCookie('accessToken');
    if (!token) {
      dispatch({
        type: UPDATE_USER_INFORMATION_FAILED,
      });
    } else {
      dispatch({ type: UPDATE_USER_INFORMATION });
      fetch(userInformationUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ email, name, password }),
      })
        .then(checkResponse)
        .then((res) => {
          if (res && res.success) {
            dispatch({
              type: UPDATE_USER_INFORMATION_SUCCESS,
              name: res.user.name,
              email: res.user.email,
            });
          } else {
            dispatch({
              type: UPDATE_USER_INFORMATION_FAILED,
            });
          }
          return res;
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: UPDATE_USER_INFORMATION_FAILED,
          });
        });
    }
  };

export const updateToken: AppThunk = () => (dispatch) => {
  const token = getCookie('refreshToken');
  dispatch({ type: UPDATE_TOKEN });
  fetch(updateTokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  })
    .then(checkResponse)
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: UPDATE_TOKEN_SUCCESS,
        });
      } else {
        dispatch({
          type: UPDATE_TOKEN_FAILED,
        });
      }
      return res;
    })
    .then((res) => {
      if (res.refreshToken && res.accessToken) {
        setCookie(`refreshToken`, res.refreshToken);
        setCookie(`accessToken`, res.accessToken);
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: UPDATE_TOKEN_FAILED,
      });
    });
};

export const logout: AppThunk = () => (dispatch) => {
  const token = getCookie('refreshToken');
  deleteCookie('accessToken');
  fetch(logoutUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  })
    .then(checkResponse)
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: LOGOUT,
        });
        deleteCookie('refreshToken');
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
