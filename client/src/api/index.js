import axios from "axios";

const config = {
  header: {
    "Content-type": "application/json",
  },
};

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:5000",
}); // 10.0.19.177

export const signin = async (loginData) => {
  const response = await API.post(
    "user/signin",
    { ...loginData, admin: true },
    config
  );
  return response.data;
};

export const changePassword = async (data) => {
  const response = await API.post("user/changePassword", data, config);
  return response.data;
};
