import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_CONNECTION_CLOSE,
  WS_CLEAR_STATE
} from '../constans/ws-constans';

export interface IWsData {
  orders: Array<IWsOrder>;
  total: number;
  totalToday: number;
}
export interface IWsOrder {
  ingredients: Array<string>;
  _id: string;
  name: string;
  status: string;
  number: number;
  createdAt: Date;
  updatedAt: Date;
}
interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload?: string;
}
interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly payload: Event;
}
interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: Event;
}
interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
  readonly payload: Event;
}
interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: IWsData;
}

interface IWsSendMessage {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: IWsData;
}
interface IWsConnectionClose{
  readonly type: typeof WS_CONNECTION_CLOSE;
  readonly payload?: string;
}
interface IWsClearState{
  readonly type: typeof WS_CLEAR_STATE
  readonly payload?:string
}
export type TWsActions =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsGetMessage
  | IWsSendMessage
  |IWsConnectionClose
  |IWsClearState;
