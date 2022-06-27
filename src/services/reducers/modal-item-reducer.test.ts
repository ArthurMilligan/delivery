import { modalItemReducer } from './modal-item-reducer'
import * as types from '../constans/modal-item-constans'
const initialState = {
    name: '',
    calories: 0,
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
}

describe('modal-items-reducer', () => {
  it('should return the initial state', () => {
    expect(modalItemReducer(undefined, {} as any)).toEqual(initialState)
  })
  it('should add item info',()=>{
    expect(
        modalItemReducer(initialState, {
            type: types.ADD_ITEM_INFORMATION,
            name: 'name',
            calories: 0,
            proteins: 0,
            fat: 0,
            carbohydrates: 0,
        })
    ).toEqual({
            name: 'name',
            calories: 0,
            proteins: 0,
            fat: 0,
            carbohydrates: 0,
    })
  })
  it('should delete item info',()=>{
    expect(
        modalItemReducer({
            name: 'name',
            calories: 0,
            proteins: 0,
            fat: 0,
            carbohydrates: 0,
    }, {
            type: types.DELETE_ITEM_INFORMATION
        })
    ).toEqual(initialState)
  })
})