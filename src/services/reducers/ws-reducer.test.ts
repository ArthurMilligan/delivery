import { wsReducer } from './ws-reducer'
import * as types from '../constans/ws-constans'
const initialState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
}

describe('password-reducer', () => {
    it('should return the initial state', () => {
        expect(wsReducer(undefined, {} as any)).toEqual(initialState)
    })
    it('ws connection success', () => {
        expect(wsReducer(initialState, { type: types.WS_CONNECTION_SUCCESS } as any)).toEqual({
            ...initialState, error: undefined,
            wsConnected: true,
        })
    })
    it('ws connection error', () => {
        expect(wsReducer(initialState, { type: types.WS_CONNECTION_ERROR, payload: 'payload' } as any)).toEqual({
            ...initialState, error: 'payload',
            wsConnected: false,
        })
    })
    it('ws connection close', () => {
        expect(wsReducer(initialState, { type: types.WS_CONNECTION_CLOSED, payload: 'payload' } as any)).toEqual({
            ...initialState, error: undefined,
            wsConnected: false,
        })
    })
    it('ws get message', () => {
        expect(wsReducer(initialState, { type: types.WS_GET_MESSAGE, payload: { success: true, orders: ['orders'], total: 123, totalToday: 123 } } as any)).toEqual({
            ...initialState, 
            error: undefined,
            orders: ['orders'],
            total: 123,
            totalToday: 123,
        })
    })
    it('ws get bad message', () => {
        expect(wsReducer(initialState, { type: types.WS_GET_MESSAGE, payload: { success: false, message: 'message', total: 123, totalToday: 123 } } as any)).toEqual({
            ...initialState, 
            error: 'message',
            total: 123,
            totalToday: 123,
        })
    })
    it('ws clear state', () => {
        expect(wsReducer({somestate:'some state'} as any, { type: types.WS_CLEAR_STATE, payload: 'payload' } as any)).toEqual({
            ...initialState,
        })
    })

})