import { FETCH_ALL_NINE, FETCH_ALL, FETCH_JP, FETCH_WW, FETCH_SG, ADD_QUOTE } from '../actions/types';

const initialState = {
    quotes: []
}

export default function (state = initialState, action) {
    switch (action.type) { // comes from actions
        case FETCH_ALL_NINE:
            return {
                ...state,
                quotes: action.payload // comes from actions
            }
        case FETCH_ALL:
            return {
                ...state,
                quotes: action.payload // comes from actions
            }
        case FETCH_SG:
            return {
                ...state,
                quotes: action.payload // comes from actions
            }
        case FETCH_WW:
            return {
                ...state,
                quotes: action.payload // comes from actions
            }
        case FETCH_JP:
            return {
                ...state,
                quotes: action.payload // comes from actions
            }
        case ADD_QUOTE:
            return {
                ...state,
                newQuote: action.payload // comes from actions
            }
        default: return state;
    }
}
