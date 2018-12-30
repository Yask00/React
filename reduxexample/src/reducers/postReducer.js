import { FETCH_POSTS, NEW_POST } from '../actions/types';

const initialState = {
    items: [],
    item: {} // single post add 
}

export default function (state = initialState, action) {
    // reducers, which are (state, action) => newState
    // evaluate what type we dealing with
    switch (action.type) { // comes from actions
        case FETCH_POSTS:
            return {
                ...state,
                items: action.payload // comes from actions
            }
        case NEW_POST: // return only new item and the push it
            return {
                ...state,
                item: action.payload // single new post
            }

        default: return state;
    }
}