import * as types from './types';
import { getMovieBoard } from '../../services/movie.service';


export const getMovie = () => async (dispatch) => {
    return getMovieBoard().then(
        (response) => {
            const data = response?.data?.data;
            dispatch({
              type: types.GET_MOVIE_SUCCESS,
              payload: data
            });
        }, (error) => {
            const message = error.response?.data?.message || error.message || error.toString();
            dispatch({
                type: types.GET_MOVIE_FAILURE,
                payload: message
            });
        });
};