import axios from "axios";

const BASE_URL = "http://localhost:4000";
const token = localStorage.getItem("access_token");
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;
