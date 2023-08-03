import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4001/api",
});
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
      } else if (error.response.status === 500) {
      } else if (error.response.status === 404) {
        // window.location.href = '/404'
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
