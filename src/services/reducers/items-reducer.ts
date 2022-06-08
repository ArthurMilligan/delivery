import { IItemsReducerState } from '../types/items-reducers-types';
import { TItemsActions } from './../actions/items-actions';
import { GET_ITEMS_FAILED, GET_ITEMS_SUCCESS, GET_ITEMS } from '../constans/items-actions-constans';

const initialState: IItemsReducerState = {
  items: [],
  itemsRequest: false,
  itemsRequestFailed: false,
};

export const itemsReducer = (state = initialState, action: TItemsActions): IItemsReducerState => {
  switch (action.type) {
    case GET_ITEMS_FAILED: {
      return {
        ...state,
        itemsRequest: false,
        itemsRequestFailed: true,
      };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        items: action.items,
        itemsRequest: false,
      };
    }
    case GET_ITEMS: {
      return {
        ...state,
        itemsRequest: true,
        itemsRequestFailed: false,
      };
    }
    default: {
      return state;
    }
  }
};
