import axios from "axios";

const api = axios.create({
  baseURL: "https://back-end.muvaffaqiyatsirlari.uz/",
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use(
  (config) => {
    const noAuthEndpoints = ["/login/"];

    if (!noAuthEndpoints.includes(config.url)) {
      const authToken = localStorage.getItem("token");

      if (authToken) {
        config.headers.Authorization = `token ${authToken}`;
      }
    }

    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token"); 
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);


export default api;