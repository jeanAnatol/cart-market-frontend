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

// export async function createAdvertisement(formData: FormData): Promise<void> {
//   const response = await fetch(`${advUrl}/new`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${TEMP_ACCESS_TOKEN}`,
//       // ❗ DO NOT set Content-Type for multipart
//     },
//     body: formData,
//   });
//
//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(
//       `Failed to create advertisement (${response.status}): ${errorText}`
//     );
//   }
// }



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