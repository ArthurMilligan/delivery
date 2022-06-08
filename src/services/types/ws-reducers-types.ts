import { IWsOrder } from '../actions/ws-actions';

export type TWsState = {
    wsConnected: boolean;
    orders: Array<IWsOrder>;
    total: number;
    totalToday: number;
    error?: Event;
  };