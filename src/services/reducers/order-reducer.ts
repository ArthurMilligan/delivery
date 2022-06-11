import { IOrderState } from './../types/order-reducers-types';
import { TOrderActions } from './../actions/order-actions';
import { GET_ORDER_SUCCESS, GET_ORDER_FAILED, GET_ORDER } from '../constans/order-constans';

const initialState: IOrderState = {
  orderDetails: {
    number: 1213,
    name: '',
  },
  orderRequest: false,
  orderRequestFailed: false,
};

export const orderReducer = (state = initialState, action: TOrderActions): IOrderState => {
  switch (action.type) {
    case GET_ORDER: {
      return {
        ...state,
        orderRequest: true,
        orderRequestFailed: false,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderDetails: {
          number: action.number,
          name: action.name,
        },
        orderRequest: false,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderRequestFailed: true,
      };
    }
    // case CHANGE_ORDER_NUMBER: {
    //     return ({
    //         ...state,
    //         orderDetails: { ...state.orderDetails, number: action.order.number }
    //     })
    // }
    default: {
      return state;
    }
  }
};
