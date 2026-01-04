import axios from "axios";

const api = axios.create({
  baseURL: "https://task-manager-1-z6oj.onrender.com",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("AXIOS TOKEN:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



export default api;
