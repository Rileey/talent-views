import * as types from './types';
import { getPostBoard } from '../../services/post.service';


export const getPost = () => async (dispatch) => {
    return getPostBoard().then(
        (response) => {
            const data = response?.data?.data;
            dispatch({
              type: types.GET_POST_SUCCESS,
              payload: data
            });
        }, (error) => {
            const message = error.response?.data?.message || error.message || error.toString();
            dispatch({
                type: types.GET_POST_FAILURE,
                payload: message
            });
        });
};