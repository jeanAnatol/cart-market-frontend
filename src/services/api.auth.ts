import { publicApi } from "../components/auth/publicApi.ts";
import type {LoginRequest, LoginResponse, RegisterRequest, UserDetailsResponse} from "../types/auth.types";
import {authFetch} from "./authFetch.ts";

const userUrl = import.meta.env.VITE_USER_API_URL;

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const res = await publicApi.post<LoginResponse>(
    import.meta.env.VITE_AUTH_URL,
    payload
  );
  
  return res.data;
}

export async function registerUser(data: RegisterRequest): Promise<void> {
  await publicApi.post(import.meta.env.VITE_REGISTER_USER_URL, data);
}

export async function getCurrentUser(): Promise<UserDetailsResponse> {
  const response = await authFetch(`${userUrl}/current-user`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  
  return response.json();
}



