import axios from "axios";
import { useState } from "react";
import authHeader from "./auth-header";

export const API_URL = "http://localhost:8000/api/";


const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user/profile", { headers: authHeader() })
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};