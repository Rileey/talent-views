import axios from 'axios';
import authHeader from '../../services/auth-header';
import { API_URL } from '../../services/user.service';
import { getMoviesError, getMoviesStart, getMoviesSuccess } from './movieActions';

export const getMovies = async (dispatch) => {
    dispatch(getMoviesStart())
    try {
        const { data } = await axios.get(API_URL + 'movie/allmovies', { headers: authHeader() })
        dispatch(getMoviesSuccess(data?.data))
    } catch (err) {
        dispatch(getMoviesError())
    }
}