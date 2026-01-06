import type {AdvertisementRead} from "../types/advertisement.read.ts";
import {publicApi} from "../components/auth/publicApi.ts";
import {authApi} from "../components/auth/authApi.ts";
import {authFetch} from "./authFetch.ts";
// import type {Paginated} from "../types/paginated.type.ts";

const advUrl = import.meta.env.VITE_ADV_API_URL;
const advFetchUrl = import.meta.env. VITE_SEARCH_API_URL;

const token = localStorage.getItem("token");

export async function getAdvertisements(): Promise<AdvertisementRead[]> {

  const response = await fetch(`${advUrl}/all`, {
    method: "GET",
    headers: {"content-type": "application/json"}
  });
  if (!response.ok) throw new Error("Failed to fetch advertisements.");

  return await response.json();
}

export async function createAdvertisement(formData: FormData): Promise<AdvertisementRead> {
  const res = await authApi.post<AdvertisementRead>(
    `${advUrl}/new`, formData,
  );
  return res.data;
}

export async function fetchAdvertisementByUuid(uuid: string): Promise<AdvertisementRead> {
  
  const response = await fetch(`${advFetchUrl}/${uuid}`, {
    method: "GET",
    headers: {"content-type": "application/json"}
  });
  if (!response.ok) throw new Error("Failed to fetch advertisement.");
  
  return await response.json();
}

export async function searchAdvertisements(params: URLSearchParams) {
  const res = await publicApi.get(`${advFetchUrl}/search?${params.toString()}`);
  return res.data;
}

export async function fetchAdvertisementsByUser(): Promise<AdvertisementRead[]> {
  const response = await authFetch(`${advUrl}/user-ads`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch user advertisements");
  }
  
  return response.json();
}

export async function deleteAdvertisement(uuid: string): Promise<void> {
  const response = await authFetch(
    `${advUrl}/delete/${uuid}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
  throw new Error("Failed to delete advertisement");
  }
}

export async function updateAdvertisement(
  formData: FormData
): Promise<AdvertisementRead> {
  const res = await authApi.post<AdvertisementRead>(
    `${advUrl}/update`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

