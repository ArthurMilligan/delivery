import { combineReducers } from "redux";
import { cartReducer } from "./cart-reducer"
import { itemsReducer } from "./items-reducer";
import { modalItemReducer } from "./modal-item-reducer";
import { orderReducer } from "./order-reducer";

export const rootReducer = combineReducers({
    cart: cartReducer,
    items: itemsReducer,
    modalItem: modalItemReducer,
    order: orderReducer
})