import * as types from '../actions/types';

const initialState = {
    user: null,
    loading: true,
    error: null
};

export const user = (state = initialState, action) => {
    switch(action.type) {
        case types.GET_SIGNED_IN_USER:
            return {
                ...state,
                loading: true
            };
        case types.GET_SIGNED_IN_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: false
            };
        case types.GET_SIGNED_IN_USER_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
        }
    
}