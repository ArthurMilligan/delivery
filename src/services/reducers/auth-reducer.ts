import { IAuthState } from './../types/auth-reducers-types';
import { TAuthActions } from './../actions/auth-actions';
import {
  GET_USER_INFORMATION,
  GET_USER_INFORMATION_FAILED,
  GET_USER_INFORMATION_SUCCESS,
  LOGIN,
  LOGIN_END,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTRATION,
  REGISTRATION_FAILED,
  REGISTRATION_SUCCESS,
  UPDATE_TOKEN,
  UPDATE_TOKEN_FAILED,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_USER_INFORMATION,
  UPDATE_USER_INFORMATION_FAILED,
  UPDATE_USER_INFORMATION_SUCCESS,
} from '../constans/auth-constans';

const initialState: IAuthState = {
  isAuth: false,
  userInformation: {
    email: '',
    name: '',
  },
  registrationInfo: {
    registrationRequest: false,
    registrationRequestFailed: false,
  },
  loginInfo: {
    loginRequest: false,
    loginRequestFailed: false,
    loginRequestSuccess: false,
  },
  getUserInfo: {
    getUserRequest: false,
    getUserRequestFailed: false,
  },
  updateUserInfo: {
    updateUserRequest: false,
    updateUserRequestFailed: false,
  },
  updateTokenInfo: {
    updateTokenRequest: false,
    updateTokenRequestFailed: false,
  },
};
export const authReducer = (state = initialState, action: TAuthActions): IAuthState => {
  switch (action.type) {
    case REGISTRATION:
      return {
        ...state,
        registrationInfo: {
          registrationRequest: true,
          registrationRequestFailed: false,
        },
      };
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        isAuth: true,
        registrationInfo: {
          registrationRequest: false,
          registrationRequestFailed: false,
        },
        userInformation: {
          email: action.email,
          name: action.name,
        },
      };
    case REGISTRATION_FAILED:
      return {
        ...state,
        registrationInfo: {
          registrationRequest: false,
          registrationRequestFailed: true,
        },
      };
    case LOGIN:
      return {
        ...state,
        loginInfo: {
          loginRequest: true,
          loginRequestFailed: false,
          loginRequestSuccess: false,
        },
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        loginInfo: {
          loginRequest: false,
          loginRequestFailed: false,
          loginRequestSuccess: true,
        },
        userInformation: {
          email: action.email,
          name: action.name,
        },
      };
    case LOGIN_END: {
      return {
        ...state,
        loginInfo: {
          loginRequest: false,
          loginRequestFailed: false,
          loginRequestSuccess: false,
        },
      };
    }
    case LOGIN_FAILED:
      return {
        ...state,
        loginInfo: {
          loginRequest: false,
          loginRequestFailed: true,
          loginRequestSuccess: false,
        },
      };
    case GET_USER_INFORMATION_SUCCESS:
      return {
        ...state,
        isAuth: true,
        userInformation: {
          email: action.email,
          name: action.name,
        },
        getUserInfo: {
          getUserRequest: false,
          getUserRequestFailed: false,
        },
      };
    case GET_USER_INFORMATION_FAILED:
      return {
        ...state,
        getUserInfo: {
          getUserRequest: false,
          getUserRequestFailed: true,
        },
      };
    case GET_USER_INFORMATION:
      return {
        ...state,
        getUserInfo: {
          getUserRequest: true,
          getUserRequestFailed: false,
        },
      };
    case UPDATE_USER_INFORMATION_SUCCESS:
      return {
        ...state,
        isAuth: true,
        userInformation: {
          email: action.email,
          name: action.name,
        },
        updateUserInfo: {
          updateUserRequest: false,
          updateUserRequestFailed: false,
        },
      };
    case UPDATE_USER_INFORMATION_FAILED:
      return {
        ...state,
        updateUserInfo: {
          updateUserRequest: false,
          updateUserRequestFailed: true,
        },
      };
    case UPDATE_USER_INFORMATION:
      return {
        ...state,
        updateUserInfo: {
          updateUserRequest: true,
          updateUserRequestFailed: false,
        },
      };
    case UPDATE_TOKEN:
      return {
        ...state,
        updateTokenInfo: {
          updateTokenRequest: true,
          updateTokenRequestFailed: false,
        },
      };
    case UPDATE_TOKEN_SUCCESS:
      return {
        ...state,
        updateTokenInfo: {
          updateTokenRequest: false,
          updateTokenRequestFailed: false,
        },
      };
    case UPDATE_TOKEN_FAILED:
      return {
        ...state,
        updateTokenInfo: {
          updateTokenRequest: false,
          updateTokenRequestFailed: true,
        },
      };
    case LOGOUT:
      return {
        ...state,
        isAuth: false,
        userInformation: {
          email: '',
          name: '',
        },
      };
    default: {
      return state;
    }
  }
};
