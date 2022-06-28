import { itemsReducer } from './items-reducer'
import * as types from '../constans/items-actions-constans'
const initialState = {
    items: [],
    itemsRequest: false,
    itemsRequestFailed: false,
}

describe('items-reducer', () => {
  it('should return the initial state', () => {
    expect(itemsReducer(undefined, {} as any)).toEqual(initialState)
  })
  it('should start get items',()=>{
    expect(
        itemsReducer(initialState, {
            type: types.GET_ITEMS
        })
    ).toEqual({
        ...initialState,
        itemsRequest: true,
        itemsRequestFailed:false ,
    })
  })
  it('should fail get items',()=>{
    expect(
        itemsReducer(initialState, {
            type: types.GET_ITEMS_FAILED
        })
    ).toEqual({
        ...initialState,
        itemsRequest: false,
        itemsRequestFailed: true,
    })
  })
  it('should success get items',()=>{
    expect(
        itemsReducer(initialState, {
            type: types.GET_ITEMS_SUCCESS,
            items:['items'] as any
        })
    ).toEqual({
        ...initialState,
        items: ['items'],
        itemsRequest: false,
    })
  })
})