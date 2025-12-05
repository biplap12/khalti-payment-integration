import axios from "axios";
import { baseURL } from "../common/SummeryApi";

const Axios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized! Token expired or missing");
    //   window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);



export default Axios;
