import { publicApi } from "../components/auth/publicApi.ts";
import type {LoginRequest, LoginResponse, RegisterRequest} from "../types/auth.types";

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



