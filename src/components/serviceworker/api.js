import axios from "axios";
import store from "../store/store";
import { logout } from "../store/storeslice";
import { toast } from "react-toastify";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
const multipartApi = axios.create({
  baseURL: API_BASE_URL,
});

const serviceapi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
      store.dispatch(logout());
      window.location.href = "/Login";
      return Promise.resolve();
    } else if (error.response?.status === 429) {
      toast.warning("Rate limit exceeded. Please try again later.");
      return Promise.resolve();
    }
    return Promise.reject(error);
  }
);

multipartApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

multipartApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
      store.dispatch(logout());
      window.location.href = "/Login";
      return Promise.resolve();
    }
    if (error.response?.status === 429) {
      toast.warning("Rate limit exceeded. Please try again later.");
      return Promise.resolve();
    }
    if (error.response && error.status === 400 && error.response.data) {
      toast.warning("Bad Request");
      const backendMessage = error.response.data.message || "Something went wrong";
      error.message = backendMessage;
      return Promise.resolve();
    }

    return Promise.reject(error);
  }
);

const apiobject = { api, multipartApi, serviceapi };

export default apiobject;
