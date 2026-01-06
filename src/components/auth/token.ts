import {jwtDecode} from "jwt-decode";

const TOKEN_KEY = "token";

type JwtPayload = {
  sub: string;
  role: string;
  iat: string;
  exp: string;
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token);
  if (!decoded?.exp) return true;
  const exp = Number(decoded.exp);
  
  const now = Date.now() / 1000; // seconds
  return exp < now;
}

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}
