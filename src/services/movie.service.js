import axios from "axios";
import authHeader from "./auth-header";

export const API_URL = "http://localhost:8000/api/";


const getMovieBoard = () => {
  return axios.get(API_URL + "movie/allmovies", { headers: authHeader() })
};

export {
  getMovieBoard,
};