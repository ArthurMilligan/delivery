import { wsReducer } from './ws-reducer';
import { combineReducers } from 'redux';
import { authReducer } from './auth-reducer';
import { cartReducer } from './cart-reducer';
import { itemsReducer } from './items-reducer';
import { modalItemReducer } from './modal-item-reducer';
import { orderReducer } from './order-reducer';
import { passwordReducer } from './password-reducer';

export const rootReducer = combineReducers({
  password: passwordReducer,
  auth: authReducer,
  cart: cartReducer,
  items: itemsReducer,
  modalItem: modalItemReducer,
  order: orderReducer,
  wsFeed: wsReducer
});
