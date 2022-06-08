import { IIngredient } from './../types/cart-reducers-types';
import { ICartState } from './../types/cart-reducers-types';
import { TCartActions } from './../actions/cart-actions';
import { ADD_PRODUCT, DELETE_PRODUCT, MOVE_PRODUCT, GET_TOTAL_PRICE, CLEAR_CART } from '../constans/cart-constans';

const initialState: ICartState = {
  bun: {
    ingredient_id: '',
    name: '',
    price: 0,
    thumbnail: '',
  },
  ingredients: [],
  totalPrice: 0,
};
export const cartReducer = (state = initialState, action: TCartActions): ICartState => {
  switch (action.type) {
    case CLEAR_CART: {
      return {
        bun: {
          ingredient_id: '',
          name: '',
          price: 0,
          thumbnail: '',
        },
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
        ingredients: [...state.ingredients.filter((i: IIngredient) => i.id !== action.id)],
      };
    }
    case GET_TOTAL_PRICE: {
      const ingredientsPrice = state.ingredients.length ? state.ingredients.reduce((acc: number, b: IIngredient) => acc + b.price, 0) : 0,
        bunsPrice = state.bun?.price ? state.bun?.price * 2 : 0;
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
