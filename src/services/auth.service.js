import axios from 'axios';
import { getUserBoard } from './user.service';

const API_URL = "http://localhost:8000/api/"

const Register = (first_name, last_name, email, phone_number, password) => {
    return axios.post(API_URL + "user/register", {
      first_name,
      last_name,
      email,
      phone_number,
      password,
    });
};

const Login = async (email, password) => {
    return axios
      .post(API_URL + "user/login", {
        email,
        password,
      })
      .then((response) => {
        if (response?.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
          const user = JSON.parse(localStorage.getItem('user'));
        }
        return response.data;
      });
};

const Logout = () => {
    localStorage.removeItem("user");
};
  
export {
    Register,
    Login,
    Logout,
};
