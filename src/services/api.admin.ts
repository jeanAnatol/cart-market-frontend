import type {FuelTypeDTO, MakeDTO, ModelDTO, VehicleTypeDTO} from "../types/vehicle.catalog.type.ts";
import {authApi} from "../components/auth/authApi.ts";

const adminUrl = import.meta.env.VITE_ADMIN_API_URL;

// VEHICLE TYPES

export async function adminFetchVehicleTypes(): Promise<VehicleTypeDTO[]> {
  const response = await authApi.get(`${adminUrl}/vehicle-types/all`);
  return response.data;
}

export async function adminCreateVehicleType(name: string): Promise<void> {
  const formData = new FormData();
  formData.append(
    "data",
    new Blob([JSON.stringify({ name })], { type: "application/json" })
  );
  
  await authApi.post(`${adminUrl}/vehicle-types/add`, formData)
}

export async function adminDeleteVehicleType(name: string): Promise<void> {
  await authApi.delete(`${adminUrl}/vehicle-types/delete/${name}`);
}

// MAKES

export async function adminFetchAllMakes(): Promise<MakeDTO[]> {
  const response = await authApi.get<MakeDTO[]>(`${adminUrl}/makes/all`);
  return response.data;
}

export async function adminCreateMake(formData: FormData): Promise<MakeDTO> {
  const response = await authApi.post<MakeDTO>(`${adminUrl}/makes/create`, formData);
  return response.data;
}

export async function adminDeleteMake(makeId: number): Promise<void> {
  await authApi.delete(`${adminUrl}/makes/delete/${makeId}`);
}

export async function adminFetchAllModels(): Promise<ModelDTO[]> {
  const response = await authApi.get<ModelDTO[]>(`${adminUrl}/models/all`);
  return response.data;
}

export async function adminCreateModel(formData: FormData): Promise<ModelDTO> {
  const response = await authApi.post<ModelDTO>(`${adminUrl}/models/new`, formData);
  return response.data;
}

export async function adminDeleteModel(modelId: number): Promise<void> {
  await authApi.delete(`${adminUrl}/models/delete/${modelId}`);
}

// FUEL TYPES

export async function adminFetchFuelTypes(): Promise<FuelTypeDTO[]> {
  const res = await authApi.get("/api/admin/fuel-types/all");
  return res.data;
}

export async function adminCreateFuelType(name: string): Promise<void> {
  const formData = new FormData();
  formData.append(
    "data",
    new Blob([JSON.stringify({ name })], { type: "application/json" })
  );
  
  await authApi.post("/api/admin/fuel-types/add", formData);
}

export async function adminDeleteFuelType(id: number): Promise<void> {
  await authApi.delete(`/api/admin/fuel-types/delete/${id}`);
}





