import { TWsActions } from '../actions/ws-actions';
import type { Middleware, MiddlewareAPI } from 'redux';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_CONNECTION_CLOSE,
  WS_CLEAR_STATE,
} from '../constans/ws-constans';
import type { AppDispatch, TRootState } from '../types';
import { wsUrl } from '../../utils/url';

export const socketMiddleware = (): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, TRootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TWsActions) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === WS_CONNECTION_CLOSE) {
        dispatch({ type: WS_CLEAR_STATE });
        socket?.close(1000, 'change page');
      }
      if (type === WS_CONNECTION_START) {
        socket = new WebSocket(payload);
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: WS_CONNECTION_ERROR, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          dispatch({ type: WS_GET_MESSAGE, payload: JSON.parse(data) });
        };

        socket.onclose = (event) => {
          dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
        };

        if (type === WS_SEND_MESSAGE) {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  }) as Middleware;
};
