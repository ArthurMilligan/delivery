import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  MOVE_PRODUCT,
  GET_TOTAL_PRICE,
  CLEAR_CART,
} from '../actions/cart-actions';

const initialState = {
  bun: {},
  ingredients: [],
  totalPrice: 0,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_CART: {
      return {
        bun: {},
        ingredients: [],
        totalPrice: 0,
      };
    }
    case MOVE_PRODUCT: {
      const newIngredients = [...state.ingredients],
        dragProduct = state.ingredients[action.dragIndex];
      newIngredients.splice(action.dragIndex, 1);
      newIngredients.splice(action.hoverIndex, 0, dragProduct);
      return {
        ...state,
        ingredients: [...newIngredients],
      };
    }
    case ADD_PRODUCT: {
      if (!action.isBun) {
        return {
          ...state,
          ingredients: [
            ...state.ingredients,
            {
              id: action.id,
              ingredient_id: action.ingredient_id,
              name: action.name,
              price: action.price,
              thumbnail: action.thumbnail,
            },
          ],
        };
      } else {
        return {
          ...state,
          bun: {
            ingredient_id: action.ingredient_id,
            name: action.name,
            price: action.price,
            thumbnail: action.thumbnail,
          },
        };
      }
    }
    case DELETE_PRODUCT: {
      return {
        ...state,
        ingredients: [...state.ingredients.filter((i) => i.id !== action.id)],
      };
    }
    case GET_TOTAL_PRICE: {
      const ingredientsPrice = state.ingredients.length
          ? state.ingredients.reduce((acc, b) => acc + b.price, 0)
          : 0,
        bunsPrice = state.bun.price ? state.bun.price * 2 : 0;
      return {
        ...state,
        totalPrice: bunsPrice + ingredientsPrice,
      };
    }
    default: {
      return state;
    }
  }
};
