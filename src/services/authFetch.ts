import {clearToken, getToken, isTokenExpired} from "../components/auth/token.ts";

export function authFetch(url: string, options: RequestInit = {}) {
  const token = getToken();
  
  if (!token || isTokenExpired(token)) {
    clearToken();
    window.location.href = "/login";
    return Promise.reject("Token expired");
  }
  
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
}