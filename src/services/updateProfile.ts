
import {authApi} from "../components/auth/authApi.ts";
import type {UpdateProfileType} from "../types/updateProfile.type.ts";

const userUrl = import.meta.env.VITE_USER_API_URL;
const token = localStorage.getItem("token");

export async function updateProfile( formData: FormData) {
  const res = await authApi.post<UpdateProfileType>(
    `${userUrl}/update`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}