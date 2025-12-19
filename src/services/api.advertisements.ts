import type {Advertisement} from "../types/advertisement.ts";

const advUrl = import.meta.env.VITE_ADV_API_URL;

export async function getAdvertisements(): Promise<Advertisement[]> {

  const response = await fetch(`${advUrl}/all`, {
    method: "GET",
    headers: {"content-type": "application/json"}
  });
  if (!response.ok) throw new Error("Failed to fetch advertisements.");

  return await response.json();
}