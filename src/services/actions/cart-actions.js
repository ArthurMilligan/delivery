import { v4 as uuidv4 } from 'uuid';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const MOVE_PRODUCT = 'MOVE_PRODUCT';
export const GET_TOTAL_PRICE = 'GET_TOTAL_PRICE';
export const CLEAR_CART = 'CLEAR_CART';
export const ADD_PRODUCT_ACTION_CREATOR = (
  ingredient_id,
  name,
  price,
  thumbnail,
  type
) => {
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
export const DELETE_PRODUCT_ACTION_CREATOR = (id) => {
  return {
    type: DELETE_PRODUCT,
    id,
  };
};
export const MOVE_PRODUCT_ACTION_CREATOR = (hoverIndex, dragIndex) => {
  return { type: MOVE_PRODUCT, hoverIndex, dragIndex };
};
