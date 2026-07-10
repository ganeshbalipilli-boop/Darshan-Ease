import axios from "axios";

const API = axios.create({
  baseURL: "https://darshanease-backend-p2jc.onrender.com/api",
});

// Add JWT token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
