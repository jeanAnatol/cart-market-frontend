// import { vehicleCatalogSchema } from "../schemas/vehicle.catalog.schema.ts";
import type { VehicleTypeDTO } from "../types/vehicle.catalog.type.ts";
import api from "./axios";


const referenceUrl = import.meta.env.VITE_SEARCH_API_URL;

// export async function fetchVehicleCatalog(): Promise<VehicleTypeDTO[]> {
//   const res = await fetch(`${referenceUrl}/all-vehicle-types`);
//
//   const raw = await res.json();
//
//   return vehicleCatalogSchema.parse(raw);
// }

export async function fetchVehicleCatalog(): Promise<VehicleTypeDTO[]> {
  const res = await api.get<VehicleTypeDTO[]>(`${referenceUrl}/all-vehicle-types`);
  return res.data;
}
