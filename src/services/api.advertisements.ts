import type {AdvertisementRead} from "../types/advertisement.read.ts";
import {publicApi} from "../components/auth/publicApi.ts";
import {authApi} from "../components/auth/authApi.ts";
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

export async function createAdvertisement(
  formData: FormData
): Promise<AdvertisementRead> {
  const res = await authApi.post<AdvertisementRead>(
    `${advUrl}/new`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
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