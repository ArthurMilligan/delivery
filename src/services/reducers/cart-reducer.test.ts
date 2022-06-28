import { cartReducer } from './cart-reducer'
import * as types from '../constans/cart-constans'
const initialState = {
  bun: {
    ingredient_id: '',
    name: '',
    price: 0,
    thumbnail: '',
  },
  ingredients: [],
  totalPrice: 0,
}

describe('cart-reducer', () => {
  it('should return the initial state', () => {
    expect(cartReducer(undefined, {} as any)).toEqual(initialState)
  })
  it('should clear cart', () => {
    expect(cartReducer({
      bun: {
        ingredient_id: '',
        name: '',
        price: 0,
        thumbnail: '',
      },
      ingredients: [{
        id: '1',
        ingredient_id: '1',
        name: 'name',
        price: 1,
        thumbnail: 'thumbnail',
      }],
      totalPrice: 0
    }, { type: types.CLEAR_CART })).toEqual(initialState)
  })
  it('should move product', () => {
    expect(cartReducer({
      bun: {
        ingredient_id: '',
        name: '',
        price: 0,
        thumbnail: '',
      },
      ingredients: [{
        id: '1',
        ingredient_id: '1',
        name: 'name',
        price: 1,
        thumbnail: 'thumbnail',
      },
      {
        id: '2',
        ingredient_id: '1',
        name: 'name',
        price: 1,
        thumbnail: 'thumbnail',
      },
      {
        id: '3',
        ingredient_id: '1',
        name: 'name',
        price: 1,
        thumbnail: 'thumbnail',
      }],
      totalPrice: 0
    }, { type: types.MOVE_PRODUCT, dragIndex: 0, hoverIndex: 1 })).toEqual({
      bun: {
        ingredient_id: '',
        name: '',
        price: 0,
        thumbnail: '',
      },
      ingredients: [{
        id: '2',
        ingredient_id: '1',
        name: 'name',
        price: 1,
        thumbnail: 'thumbnail',
      },
      {
        id: '1',
        ingredient_id: '1',
        name: 'name',
        price: 1,
        thumbnail: 'thumbnail',
      },
      {
        id: '3',
        ingredient_id: '1',
        name: 'name',
        price: 1,
        thumbnail: 'thumbnail',
      }],
      totalPrice: 0
    })
  })
  it('should add product', () => {
    expect(cartReducer({
      bun: {
        ingredient_id: '',
        name: '',
        price: 0,
        thumbnail: '',
      },
      ingredients: [{
        id: '1',
        ingredient_id: '1',
        name: 'name',
        price: 1,
        thumbnail: 'thumbnail',
      },
      {
        id: '2',
        ingredient_id: '1',
        name: 'name',
        price: 1,
        thumbnail: 'thumbnail',
      }],
      totalPrice: 0
    }, {
      type: types.ADD_PRODUCT,
      id: '3',
      ingredient_id: '1',
      name: 'name',
      price: 1,
      thumbnail: 'thumbnail',
      isBun:false
    })).toEqual({
      bun: {
        ingredient_id: '',
        name: '',
        price: 0,
        thumbnail: '',
      },
      ingredients: [{
        id: '1',
        ingredient_id: '1',
        name: 'name',
        price: 1,
        thumbnail: 'thumbnail',
      },
      {
        id: '2',
        ingredient_id: '1',
        name: 'name',
        price: 1,
        thumbnail: 'thumbnail',
      },
      {
        id: '3',
        ingredient_id: '1',
        name: 'name',
        price: 1,
        thumbnail: 'thumbnail',
      }],
      totalPrice: 0
    })
  })
  it('should delete product', () => {
    expect(cartReducer({
      bun: {
        ingredient_id: '',
        name: '',
        price: 0,
        thumbnail: '',
      },
      ingredients: [{
        id: '1',
        ingredient_id: '1',
        name: 'name',
        price: 1,
        thumbnail: 'thumbnail',
      },
      {
        id: '2',
        ingredient_id: '1',
        name: 'name',
        price: 1,
        thumbnail: 'thumbnail',
      },
      {
        id: '3',
        ingredient_id: '1',
        name: 'name',
        price: 1,
        thumbnail: 'thumbnail',
      }],
      totalPrice: 0
    }, {
      type: types.DELETE_PRODUCT,
      id: '3'
    })).toEqual({
      bun: {
        ingredient_id: '',
        name: '',
        price: 0,
        thumbnail: '',
      },
      ingredients: [{
        id: '1',
        ingredient_id: '1',
        name: 'name',
        price: 1,
        thumbnail: 'thumbnail',
      },
      {
        id: '2',
        ingredient_id: '1',
        name: 'name',
        price: 1,
        thumbnail: 'thumbnail',
      }
     ],
      totalPrice: 0
    })
  })
  it('should delete product', () => {
    expect(cartReducer({
      bun: {
        ingredient_id: '',
        name: '',
        price: 0,
        thumbnail: '',
      },
      ingredients: [{
        id: '1',
        ingredient_id: '1',
        name: 'name',
        price: 1,
        thumbnail: 'thumbnail',
      },
      {
        id: '2',
        ingredient_id: '1',
        name: 'name',
        price: 1,
        thumbnail: 'thumbnail',
      },
      {
        id: '3',
        ingredient_id: '1',
        name: 'name',
        price: 1,
        thumbnail: 'thumbnail',
      }],
      totalPrice: 0
    }, {
      type: types.GET_TOTAL_PRICE
    })).toEqual({
      bun: {
        ingredient_id: '',
        name: '',
        price: 0,
        thumbnail: '',
      },
      ingredients: [{
        id: '1',
        ingredient_id: '1',
        name: 'name',
        price: 1,
        thumbnail: 'thumbnail',
      },
      {
        id: '2',
        ingredient_id: '1',
        name: 'name',
        price: 1,
        thumbnail: 'thumbnail',
      },
      {
        id: '3',
        ingredient_id: '1',
        name: 'name',
        price: 1,
        thumbnail: 'thumbnail',
      }],
      totalPrice: 3
    })
  })
})