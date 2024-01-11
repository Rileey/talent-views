import axios from "axios";
import authHeader from "./auth-header";

export const API_URL = "http://localhost:8000/api/";


const getPostBoard = () => {
  return axios.get(API_URL + "post/allpost", { headers: authHeader() })
};

export {
  getPostBoard,
};