import {useEffect, useMemo, useState} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { AdvertisementRead } from "../../types/advertisement.read";
import type { AdvertisementUpdate } from "../../types/advertisement.update";

import { advertisementUpdateSchema } from "../../schemas/advertisement.update.schema";

import {
  fetchFuelTypes,
  fetchVehicleCatalog,
  fetchVehicleStates,
} from "../../services/api.vehicle.catalog";

import {updateAdvertisement} from "../../services/api.advertisements.ts";
import { mapToUpdateIds } from "../../utils/advertisementUpdate.mapper";

import MapPicker from "../MapPicker";
import type {FuelTypeDTO, VehicleTypeDTO} from "../../types/vehicle.catalog.type.ts";
import {useNavigate} from "react-router";

type Props = {
  ad: AdvertisementRead;
};

export default function AdvertisementUpdateForm({ ad }: Props) {
  const [vehicleTypes, setVehicleTypes] = useState<VehicleTypeDTO[]>([]);
  const [fuelTypes, setFuelTypes] = useState<FuelTypeDTO[]>([]);
  const [vehicleStates, setVehicleStates] = useState<string[]>([]);
  
  // const [updatedAd, setUpdatedAd] = useState<AdvertisementRead | null>(null);
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    resetField,
    formState: { errors },
  } = useForm<AdvertisementUpdate>({
    resolver: zodResolver(advertisementUpdateSchema),
    defaultValues: {
      adUuid: ad.uuid,
      deleteOldAttachments: false,
    },
  });
  
  
  useEffect(() => {
    fetchVehicleCatalog().then(setVehicleTypes);
    fetchFuelTypes().then(setFuelTypes);
    fetchVehicleStates().then(setVehicleStates);
  }, []);
  
  const navigate = useNavigate();
  
  // prefill id fields
  useEffect(() => {
    if (!vehicleTypes.length || !fuelTypes.length) return;
    
    const ids = mapToUpdateIds(ad, vehicleTypes, fuelTypes);
    
    setValue("vehicleDetailsUpdateDTO.vehicleTypeId", ids.vehicleTypeId);
    setValue("vehicleDetailsUpdateDTO.makeId", ids.makeId);
    setValue("vehicleDetailsUpdateDTO.modelId", ids.modelId);
    setValue("engineSpecUpdateDTO.fuelTypeId", ids.fuelTypeId);
    
    setValue("price", ad.price);
    setValue("vehicleDetailsUpdateDTO.manufactureYear", ad.vehicleDetailsDTO.manufactureYear);
    setValue("vehicleDetailsUpdateDTO.mileage", ad.vehicleDetailsDTO.mileage);
    setValue("vehicleDetailsUpdateDTO.color", ad.vehicleDetailsDTO.color);
    setValue("vehicleDetailsUpdateDTO.vehicleDescriptionText", ad.vehicleDetailsDTO.vehicleDescriptionText);
    setValue("vehicleDetailsUpdateDTO.state", ad.vehicleDetailsDTO.state);
    
    setValue("engineSpecUpdateDTO.displacement", ad.engineSpecDTO.displacement);
    setValue("engineSpecUpdateDTO.horsePower", ad.engineSpecDTO.horsePower);
    
    setValue("contactInfoUpdateDTO.email", ad.contactInfoDTO.email);
    setValue("contactInfoUpdateDTO.sellerName", ad.contactInfoDTO.sellerName);
    setValue("contactInfoUpdateDTO.telephoneNumber1", ad.contactInfoDTO.telephoneNumber1);
    setValue("contactInfoUpdateDTO.telephoneNumber2", ad.contactInfoDTO.telephoneNumber2);
    setValue("locationUpdateDTO.locationName", ad.locationDTO.locationName);
    setValue("locationUpdateDTO.postalCode", ad.locationDTO.postalCode);
    setValue("locationUpdateDTO.latitude", ad.locationDTO.latitude);
    setValue("locationUpdateDTO.longitude", ad.locationDTO.longitude);
    
    
  }, [vehicleTypes, fuelTypes, ad, setValue]);
  
  
  const vehicleTypeId = watch("vehicleDetailsUpdateDTO.vehicleTypeId");
  const makeId = watch("vehicleDetailsUpdateDTO.makeId");
  
  const selectedVehicleType = useMemo(
    () => vehicleTypes.find(vt => vt.id === vehicleTypeId),
    [vehicleTypes, vehicleTypeId]
  );
  
  
  const makes = selectedVehicleType?.makes ?? [];
  
  const selectedMake = useMemo(
    () => makes.find(m => m.id === makeId),
    [makes, makeId]
  );
  
  const models = selectedMake?.models ?? [];
  
  // Submit
  const onSubmit = async (data: AdvertisementUpdate) => {
    const formData = new FormData();
    
    const {images, ...jsonPayload} = data;
    
    formData.append(
      "data",
      new Blob([JSON.stringify(jsonPayload)], {
        type: "application/json"
      })
    );
    
    images?.forEach(img => formData.append("images", img));
    
    // await updateAdvertisement(formData);
    const savedAd = await updateAdvertisement(formData);
    // setUpdatedAd(savedAd);
    
    navigate(`/advertisements/${savedAd.uuid}`);
  };
  
  // Location
  const handleLocationSelect = async (lat: string, lon: string): Promise<void> => {
    setValue("locationUpdateDTO.latitude", lat);
    setValue("locationUpdateDTO.longitude", lon);
  };
  
  return (
    <>
      <div className="z-50">
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 max-w-6xl mx-auto mt-20">
      
      {/* VEHICLE */}
      {/* VEHICLE INFORMATION */}
      <section className=" p-6 rounded-xl shadow bg-white">
        <h2 className="text-xl font-semibold mb-6">Vehicle Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        {/* VEHICLE TYPE */}
        <select
          {...register("vehicleDetailsUpdateDTO.vehicleTypeId", {
            valueAsNumber: true
          })}
          onChange={e => {
            const id = Number(e.target.value);
            setValue("vehicleDetailsUpdateDTO.vehicleTypeId", id);
            resetField("vehicleDetailsUpdateDTO.makeId");
            resetField("vehicleDetailsUpdateDTO.modelId");
          }}
          className="border rounded p-2"
        >
          <option value="">Vehicle type</option>
          {vehicleTypes.map(vt => (
            <option key={vt.id} value={vt.id}>
              {vt.name}
            </option>
          ))}
        </select>
        
        {/* MAKE */}
        <select
          {...register("vehicleDetailsUpdateDTO.makeId", {
            valueAsNumber: true
          })}
          disabled={!makes.length}
          onChange={e => {
            const id = Number(e.target.value);
            setValue("vehicleDetailsUpdateDTO.makeId", id);
            resetField("vehicleDetailsUpdateDTO.modelId");
          }}
          className="border rounded p-2 disabled:bg-gray-100"
        >
          <option value="">Select Make</option>
          {makes.map(m => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
        
        {/* MODEL */}
        <select
          {...register("vehicleDetailsUpdateDTO.modelId", {
            valueAsNumber: true
          })}
          disabled={!models.length}
        >
          <option value="">Select model</option>
          {models.map(m => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
        
        {/* MANUFACTURE YEAR */}
        <input
          placeholder="Manufacture Year"
          {...register("vehicleDetailsUpdateDTO.manufactureYear")}
          className="border rounded p-2"
        />
        
        {/* MILEAGE */}
        <input
          type="number"
          placeholder="Mileage"
          {...register("vehicleDetailsUpdateDTO.mileage", {
            valueAsNumber: true,
          })}
          className="border rounded p-2"
        />
        
        {/* COLOR */}
        <input
          placeholder="Color"
          {...register("vehicleDetailsUpdateDTO.color")}
          className="border rounded p-2"
        />
        
        {/* STATE */}
        <select
          {...register("vehicleDetailsUpdateDTO.state")}
          className="border rounded p-2"
        >
          <option value="">Select state</option>
          {vehicleStates.map(state => (
            <option key={state} value={state}>
              {state.replace("_", " ")}
            </option>
          ))}
        </select>
        
        {/* DESCRIPTION */}
        <textarea
          placeholder="Description"
          {...register("vehicleDetailsUpdateDTO.vehicleDescriptionText")}
          className="border rounded p-2 md:col-span-3"
        />
      </div>
      </section>
      
      {/* ENGINE */}
      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Engine</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* FUEL TYPE */}
          <select
            {...register("engineSpecUpdateDTO.fuelTypeId", {
              valueAsNumber: true,
            })}
            className="border rounded p-2"
          >
            <option value="">Select fuel type</option>
            {fuelTypes.map(ft => (
              <option key={ft.id} value={ft.id}>
                {ft.name}
              </option>
            ))}
          </select>
          
          {/* DISPLACEMENT */}
          <input
            type="number"
            placeholder="Displacement (cc)"
            {...register("engineSpecUpdateDTO.displacement", {
              valueAsNumber: true,
            })}
            className="border rounded p-2"
          />
          
          {/* HORSE POWER */}
          <input
            type="number"
            placeholder="Horse Power"
            {...register("engineSpecUpdateDTO.horsePower", {
              valueAsNumber: true,
            })}
            className="border rounded p-2"
          />
          
          {/* GEARBOX */}
          <select
            {...register("engineSpecUpdateDTO.gearboxType")}
            className="border rounded p-2"
          >
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>
      </section>
      
      {/*  PRICE */}
      <section className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-6">Price</h2>
        
        <input
          type="number"
          placeholder="Price"
          {...register("price", {valueAsNumber: true})}
          className="border rounded p-2 w-full md:w-1/3"
        />
        {errors.price && (
          <p className="text-red-600 text-sm mt-1">
            {errors.price.message}
          </p>
        )}
      </section>
      
      {/* LOCATION */}
      <section className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-6">Location</h2>
        
        <div className="container mb-4 w-full h-full overflow-hidden rounded-xl border-2 border-gray-400 relative z-0">
          <MapPicker onChange={handleLocationSelect}/>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="City"
            {...register("locationUpdateDTO.locationName")}
            className="border rounded p-2"
          />
          <input
            placeholder="Postal Code"
            {...register("locationUpdateDTO.postalCode")}
            className="border rounded p-2"
          />
          <input
            placeholder="Longitude"
            {...register("locationUpdateDTO.longitude")}
            className="border rounded p-2"
          />
          <input
            placeholder="Latitude"
            {...register("locationUpdateDTO.latitude")}
            className="border rounded p-2"
          />
        </div>
      </section>
      
      {/* CONTACT INFORMATION */}
      <section className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Seller name"
            {...register("contactInfoUpdateDTO.sellerName")}
            className="border rounded p-2"
          />
          <input
            placeholder="Email"
            {...register("contactInfoUpdateDTO.email")}
            className="border rounded p-2"
          />
          <input
            placeholder="Phone 1"
            {...register("contactInfoUpdateDTO.telephoneNumber1")}
            className="border rounded p-2"
          />
          <input
            placeholder="Phone 2"
            {...register("contactInfoUpdateDTO.telephoneNumber2")}
            className="border rounded p-2"
          />
        </div>
      </section>
      
      {/* IMAGES */}
      <section className="bg-white p-6 rounded-xl ">
        <input
          className=""
          type="file"
          multiple
          accept="image/*"
          onChange={e => {
            if (!e.target.files) return;
            setValue("images", Array.from(e.target.files));
          }}
        />
        
        <label className="flex items-center gap-2 mt-4">
          <input type="checkbox" {...register("deleteOldAttachments")} />
          Delete old images
        </label>
      </section>
      
      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
        Update Advertisement
      </button>
    </form>
      </div>
    </>
  );
}
