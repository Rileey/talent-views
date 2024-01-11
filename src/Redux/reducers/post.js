import * as types from '../actions/types';

const initialState = {
    posts: [],
    loading: true,
    error: null
};

export const post = (state = initialState, action) => {
    switch(action.type) {
        case types.GET_POST:
            return {
                ...state,
                loading: true
            };
        case types.GET_POST_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        case types.GET_POST_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
        }
}