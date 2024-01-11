import * as types from './types';
import { getUserBoard } from '../../services/user.service';


export const getUser = () => async (dispatch) => {
    return getUserBoard().then(
        (response) => {
            const data = response?.data?.data;
            console.log(data)
            dispatch({
              type: types.GET_SIGNED_IN_USER_SUCCESS,
              payload: data
            });
        }, (error) => {
            const message = error.response?.data?.message || error.message || error.toString();
            dispatch({
                type: types.GET_SIGNED_IN_USER_FAILURE,
                payload: message
            });
        });
};