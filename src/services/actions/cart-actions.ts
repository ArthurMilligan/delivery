import { v4 as uuidv4 } from 'uuid';
import { ADD_PRODUCT, DELETE_PRODUCT, MOVE_PRODUCT, GET_TOTAL_PRICE, CLEAR_CART } from '../constans/cart-constans';

export interface IAddProductAction {
  readonly type: typeof ADD_PRODUCT;
  readonly id: string;
  readonly ingredient_id: string;
  readonly name: string;
  readonly price: number;
  readonly thumbnail: string;
  readonly isBun: boolean;
}
export interface IDeleteProductAction {
  readonly type: typeof DELETE_PRODUCT;
  readonly id: string;
}
export interface IMoveProductAction {
  readonly type: typeof MOVE_PRODUCT;
  readonly hoverIndex: number;
  readonly dragIndex: number;
}
export interface IGetTotalPriceAction {
  readonly type: typeof GET_TOTAL_PRICE;
}
export interface IClearCartAction {
  readonly type: typeof CLEAR_CART;
}
export type TCartActions = IAddProductAction | IDeleteProductAction | IMoveProductAction | IGetTotalPriceAction | IClearCartAction;

export const ADD_PRODUCT_ACTION_CREATOR = (ingredient_id: string, name: string, price: number, thumbnail: string, type: string) => {
  return {
    type: ADD_PRODUCT,
    id: uuidv4(),
    ingredient_id,
    name,
    price,
    thumbnail,
    isBun: type === 'bun',
  };
};
export const DELETE_PRODUCT_ACTION_CREATOR = (id: string) => {
  return {
    type: DELETE_PRODUCT,
    id,
  };
};
export const MOVE_PRODUCT_ACTION_CREATOR = (hoverIndex: number, dragIndex: number) => {
  return { type: MOVE_PRODUCT, hoverIndex, dragIndex };
};
