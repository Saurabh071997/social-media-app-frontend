import { API_URL } from "./config";
import axios from "axios";

export const handleUserSignup = async (newUserObj) => {
  // console.log("inside handle signup service")
  const response = await axios.post(`${API_URL}/signup`, {
    email: newUserObj?.email,
    name: newUserObj?.name,
    username: newUserObj?.username,
    password: newUserObj?.password,
  });
  return response;
};

export const handleUserLogin = async (loginUserObj) => {
  const response = await axios.post(`${API_URL}/login`, {
    usermail: loginUserObj?.usermail,
    userpassword: loginUserObj?.userpassword,
  });
  return response;
};

export const getUserData = async () => {
  const response = await axios.get(`${API_URL}/user/details`);
  return response;
};
