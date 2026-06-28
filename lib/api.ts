import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://learning-platform-backend-plum.vercel.app/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (typeof window !== "undefined" && err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    return Promise.reject(err);
  }
);
