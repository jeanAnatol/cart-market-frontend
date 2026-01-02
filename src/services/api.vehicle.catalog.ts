// import { vehicleCatalogSchema } from "../schemas/vehicle.catalog.schema.ts";
import type {FuelTypeDTO, VehicleTypeDTO} from "../types/vehicle.catalog.type.ts";
import {publicApi} from "../components/auth/publicApi.ts";



const referenceUrl = import.meta.env.VITE_SEARCH_API_URL;

export async function fetchVehicleCatalog(): Promise<VehicleTypeDTO[]> {
  const res = await publicApi.get<VehicleTypeDTO[]>(`${referenceUrl}/all-vehicle-types`);
  return res.data;
}
export async function fetchFuelTypes(): Promise<FuelTypeDTO[]> {
  const res = await publicApi.get<FuelTypeDTO[]>(`${referenceUrl}/all-fuel-types`);
  return res.data;
}

export async function fetchVehicleStates(): Promise<string[]> {
  const res = await publicApi.get<string[]>(`${referenceUrl}/all-vehicle-states`);
  return res.data;
}