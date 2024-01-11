import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import { user } from "./user"
import { movie } from "./movie";
import { post } from "./post";

export default combineReducers({
  auth,
  movie,
  post,
  user,
  message,
});