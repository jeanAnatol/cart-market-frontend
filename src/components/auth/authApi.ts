
import axios from "axios";
import {getToken} from "./token.ts";


export const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL,
});

authApi.interceptors.request.use(config => {
  const token = getToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  error => Promise.reject(error)
);
