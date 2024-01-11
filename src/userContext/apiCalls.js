import axios from "axios";
import authHeader from "../services/auth-header";
// import { deleteMoviesSuccess, deleteMoviesFailure, deleteMoviesStart } from "./movieActions";
import { deleteUsersFailure, deleteUsersStart, deleteUsersSuccess, getUsersFailure, getUsersStart, getUsersSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "./userActions";


export const getUsers = async (dispatch) => {
    dispatch(getUsersStart());
    try {
        const {data} = await axios.get('/user/profile', { headers: authHeader() });
        dispatch(getUsersSuccess(data?.data))
    } catch (err) {
        dispatch(getUsersFailure());
    }
}

export const updateUser = async (dispatch, id, users) => {
    dispatch(updateUserStart());

    try {
        const res = await axios.put('/users/' + id, users,{
            headers: {
                token: 'Bearer '+ JSON.parse(localStorage.getItem('user')).accessToken 
            }
        });
        dispatch(updateUserSuccess(res.data))
    } catch (err) {
        dispatch(updateUserFailure())
    }
}



export const deleteUsers = async (id, dispatch) => {
    dispatch(deleteUsersStart());
    try {
        await axios.delete('/users/' + id, {
            headers: {
                token: "Bearer "+ JSON.parse(localStorage.getItem('user')).accessToken 
            }
        });
        dispatch(deleteUsersSuccess(id))
    } catch (err) {
        dispatch(deleteUsersFailure());
    }
}