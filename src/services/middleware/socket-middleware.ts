import { IWsActionTypes } from './../constans/ws-constans';
import { TWsActions } from '../actions/ws-actions';
import type { Middleware, MiddlewareAPI } from 'redux';

import type { AppDispatch, TRootState } from '../types';

export const socketMiddleware = (wsActions: IWsActionTypes): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, TRootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TWsActions) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === wsActions.WS_CONNECTION_CLOSE) {
        dispatch({ type: wsActions.WS_CLEAR_STATE });
        socket?.close(1000, 'change page');
      }
      if (type === wsActions.WS_CONNECTION_START && typeof payload === 'string') {
        socket = new WebSocket(payload);
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: wsActions.WS_CONNECTION_SUCCESS, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: wsActions.WS_CONNECTION_ERROR, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          dispatch({ type: wsActions.WS_GET_MESSAGE, payload: JSON.parse(data) });
        };

        socket.onclose = (event) => {
          dispatch({ type: wsActions.WS_CONNECTION_CLOSED, payload: event });
        };

        if (type === wsActions.WS_SEND_MESSAGE) {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  }) as Middleware;
};
