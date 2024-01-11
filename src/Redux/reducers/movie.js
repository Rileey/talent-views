import * as types from '../actions/types';

const initialState = {
    movies: [],
    loading: true,
    error: null
};

export const movie = (state = initialState, action) => {
    switch(action.type) {
        case types.GET_MOVIE:
            return {
                ...state,
                loading: true
            };
        case types.GET_MOVIE_SUCCESS:
            return {
                ...state,
                movies: action.payload,
                loading: false
            };
        case types.GET_MOVIE_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
        }
}