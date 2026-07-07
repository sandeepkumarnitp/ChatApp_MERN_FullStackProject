import axios from "axios";

const DB_URL = import.meta.env.VITE_DB_URL;

export const axiosInstance = axios.create({
  baseURL: [
    DB_URL,
    "https://chat-app-mern-full-stack-project.vercel.app/api/v1",
  ],
  withCredentials: true,
  headers: {
    ContentType: "application/json",
  },
});
