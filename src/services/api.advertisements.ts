import type {AdvertisementRead} from "../types/advertisement.read.ts";
import api from "./axios";

const advUrl = import.meta.env.VITE_ADV_API_URL;

const TEMP_ACCESS_TOKEN =
  import.meta.env.VITE_TEMP_ACCESS_TOKEN;



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
  const res = await api.post<AdvertisementRead>(
    `${advUrl}/new`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${TEMP_ACCESS_TOKEN}`,
      },
    }
  );
  
  return res.data;
}

export async function fetchAdvertisementByUuid(uuid: string): Promise<AdvertisementRead> {
  
  const response = await fetch(`${advUrl}/${uuid}`, {
    method: "GET",
    headers: {"content-type": "application/json"}
  });
  if (!response.ok) throw new Error("Failed to fetch advertisement.");
  
  return await response.json();
}