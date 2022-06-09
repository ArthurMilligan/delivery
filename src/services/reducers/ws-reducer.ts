import { WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE, WS_CLEAR_STATE } from '../constans/ws-constans';
import type { TWsActions } from '../actions/ws-actions';
import { TWsState } from '../types/ws-reducers-types';

const initialState: TWsState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const wsReducer = (state = initialState, action: TWsActions): TWsState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        orders: [...action.payload.orders],
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    case WS_CLEAR_STATE:
      return {
        wsConnected: false,
        orders: [],
        total: 0,
        totalToday: 0,
      };
    default:
      return state;
  }
};
