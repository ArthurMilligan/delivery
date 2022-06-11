import { TWsActions } from '../actions/ws-actions';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { TPasswordActions } from './../actions/password-actions';
import { TOrderActions } from './../actions/order-actions';
import { TModalItemActions } from './../actions/modal-item-actions';
import { TItemsActions } from './../actions/items-actions';
import { TCartActions } from './../actions/cart-actions';
import { TAuthActions } from './../actions/auth-actions';
import { store } from './../store';

export type TRootState = ReturnType<typeof store.getState>;
export type TApplicationActions = TAuthActions | TCartActions | TItemsActions | TModalItemActions | TOrderActions | TPasswordActions | TWsActions;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, TRootState, TApplicationActions>>;
export type AppDispatch = typeof store.dispatch;
