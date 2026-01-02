import axios from "axios";

export async function reverseGeocode(lat: number, lon: number) {
  const res = await axios.get("https://nominatim.openstreetmap.org/reverse", {
    
    params: {
      lat,
      lon,
      format: "json",
    },
    headers: {
      "Accept-Language": "el",
      "User-Agent": "cart-market-frontend",
    },
  });
  console.log(res);
  return res.data;
}