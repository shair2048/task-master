import axios from "axios";

const api = axios.create({
  // baseURL: "http://192.168.1.6:3000/api",
  baseURL: "http://10.50.170.223:3000/api",
  timeout: 5000,
});

export default api;
