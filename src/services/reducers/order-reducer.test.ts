import { orderReducer } from './order-reducer'
import * as types from '../constans/order-constans'
const initialState = {
    orderDetails: {
        number: 0,
        name: '',
      },
      orderRequest: false,
      orderRequestFailed: false,
}

describe('order-reducer', () => {
  it('should return the initial state', () => {
    expect(orderReducer(undefined, {} as any)).toEqual(initialState)
  })
  it('should start get order',()=>{
    expect(
        orderReducer(initialState, {
            type: types.GET_ORDER
        })
    ).toEqual({
            ...initialState,
            orderRequest: true,
            orderRequestFailed: false,
    })
  })
  it('should fail get order',()=>{
    expect(
        orderReducer(initialState, {
            type: types.GET_ORDER_FAILED
        })
    ).toEqual({
            ...initialState,
            orderRequest: false,
            orderRequestFailed: true,
    })
  })
  it('should success get order',()=>{
    expect(
        orderReducer(initialState, {
            type: types.GET_ORDER_SUCCESS,
            number: 1,
            name: 'name',
        })
    ).toEqual({
            ...initialState,
            orderDetails: {
                number: 1,
                name: 'name',
            }
    })
  })
})