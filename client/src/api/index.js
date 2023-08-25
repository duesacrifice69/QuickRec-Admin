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

export const createVacancy = async (vacancyData) => {
  const response = await API.post("vacancy/createVacancy", vacancyData, config);
  return response.data;
};
export const deleteVacancy = async (vacancyId) => {
  const response = await API.post(`vacancy/deleteVacancy/${vacancyId}`, config);
  return response.data;
};

export const vacancies = async () => {
  const response = await API.get("vacancy", config);
  return response.data;
};
