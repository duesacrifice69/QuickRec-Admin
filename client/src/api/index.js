import axios from "axios";

const config = {
  header: {
    "Content-type": "application/json",
  },
};

const API = axios.create({ baseURL: "http://localhost:5000" });

export const signin = async (loginData) => {
  const response = await API.post("user/signin", loginData, config);
  return response.data;
};
