import {
    GET_ITEMS_FAILED,
    GET_ITEMS_SUCCESS,
    GET_ITEMS
} from '../actions/items-actions'

const initialState = {
    items: [],
    itemsRequest: false,
    itemsRequestFailed: false
}

export const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ITEMS_FAILED: {
            return {
                ...state,
                itemsRequest: false,
                itemsRequestFailed: true
            }
        }
        case GET_ITEMS_SUCCESS: {
            return {
                ...state,
                items: action.items,
                itemsRequest: false,
            }
        }
        case GET_ITEMS: {
            return {
                ...state,
                itemsRequest: true,
                itemsRequestFailed: false
            }
        }
        default: {
            return state
        }
    }
}