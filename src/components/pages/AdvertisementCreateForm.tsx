import {useEffect, useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {advertisementInsertSchema} from "../../schemas/advertisement.insert.schema";
import type {AdvertisementInsert} from "../../types/advertisement.insert";
import type {FuelTypeDTO, VehicleTypeDTO} from "../../types/vehicle.catalog.type.ts";

import {fetchFuelTypes, fetchVehicleCatalog, fetchVehicleStates} from "../../services/api.vehicle.catalog.ts";
import {createAdvertisement} from "../../services/api.advertisements.ts";
import type {AdvertisementRead} from "../../types/advertisement.read.ts";


export default function AdvertisementCreateForm() {
  
  const [vehicleTypes, setVehicleTypes] = useState<VehicleTypeDTO[]>([]);
  const [fuelTypes, setFuelTypes] = useState<FuelTypeDTO[]>([]);
  const [vehicleStates, setVehicleStates] = useState<string[]>([]);
  
  const [createdAd, setCreatedAd] = useState<AdvertisementRead | null>(null);
  
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {errors},
  } = useForm<AdvertisementInsert>({
    resolver: zodResolver(advertisementInsertSchema),
    defaultValues: {
      userId: 1,
    },
  });
  
  useEffect(() => {
    fetchFuelTypes().then(setFuelTypes);
  }, []);
  
  useEffect(() => {
    fetchVehicleCatalog().then(setVehicleTypes);
  }, []);
  
  useEffect(() => {
    fetchVehicleStates().then(setVehicleStates);
  }, []);
  
  
  const vehicleTypeId = watch("vehicleDetailsInsertDTO.vehicleTypeId");
  const makeId = watch("vehicleDetailsInsertDTO.makeId");
  
  
  const selectedVehicleType = useMemo(
    () => vehicleTypes.find(vt => vt.id === vehicleTypeId),
    [vehicleTypes, vehicleTypeId]
  );
  
  const makes = selectedVehicleType?.makes ?? [];
  
  const selectedMake = useMemo(
    () => makes.find(m => m.id === makeId),
    [makes, makeId]
  );
  
  const models = useMemo(() => {
    if (!selectedMake || !selectedVehicleType) return [];
    
    return selectedMake.models.filter(
      model => model.vehicleType === selectedVehicleType.name
    );
  }, [selectedMake, selectedVehicleType]);
  
  
  const onSubmit = async (data: AdvertisementInsert) => {
    const formData = new FormData();
    
    const {images, ...jsonPayload} = data;
    
    formData.append(
      "data",
      new Blob([JSON.stringify(jsonPayload)], {
        type: "application/json",
      })
    );
    images?.forEach(img => formData.append("images", img));
    
    // await createAdvertisement(formData);
    const savedAd = await createAdvertisement(formData);
    setCreatedAd(savedAd);
  };
  
  
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-6xl mx-auto mt-12 flex flex-col gap-10 mt-40 mb-10"
      >
        
        {/* VEHICLE INFORMATION */}
        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-6">Vehicle Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* VEHICLE TYPE */}
            <select
              {...register("vehicleDetailsInsertDTO.vehicleTypeId", {
                valueAsNumber: true,
              })}
              onChange={e => {
                const id = Number(e.target.value);
                setValue("vehicleDetailsInsertDTO.vehicleTypeId", id);
                setValue("vehicleDetailsInsertDTO.makeId", undefined);
                setValue("vehicleDetailsInsertDTO.modelId", undefined);
              }}
              className="border rounded p-2"
            >
              <option value="">Select vehicle type</option>
              {vehicleTypes.map(vt => (
                <option key={vt.id} value={vt.id}>
                  {vt.name}
                </option>
              ))}
            </select>
            
            {/* MAKE */}
            <select
              {...register("vehicleDetailsInsertDTO.makeId", {
                valueAsNumber: true,
              })}
              disabled={!makes.length}
              onChange={e => {
                const id = Number(e.target.value);
                setValue("vehicleDetailsInsertDTO.makeId", id);
                setValue("vehicleDetailsInsertDTO.modelId", undefined);
              }}
              className="border rounded p-2 disabled:bg-gray-100"
            >
              <option value="">Select make</option>
              {makes.map(make => (
                <option key={make.id} value={make.id}>
                  {make.name}
                </option>
              ))}
            </select>
            
            {/* MODEL */}
            <select
              {...register("vehicleDetailsInsertDTO.modelId", {
                valueAsNumber: true,
              })}
              disabled={!models.length}
              className="border rounded p-2 disabled:bg-gray-100"
            >
              <option value="">Select model</option>
              {models.map(model => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
            
            {/* MANUFACTURE YEAR */}
            <input
              placeholder="Manufacture Year"
              {...register("vehicleDetailsInsertDTO.manufactureYear")}
              className="border rounded p-2"
            />
            
            {/* MILEAGE */}
            <input
              type="number"
              placeholder="Mileage"
              {...register("vehicleDetailsInsertDTO.mileage", {
                valueAsNumber: true,
              })}
              className="border rounded p-2"
            />
            
            {/* COLOR */}
            <input
              placeholder="Color"
              {...register("vehicleDetailsInsertDTO.color")}
              className="border rounded p-2"
            />
            
            {/* STATE */}
            <select
              {...register("vehicleDetailsInsertDTO.state")}
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
              {...register("vehicleDetailsInsertDTO.vehicleDescriptionText")}
              className="border rounded p-2 md:col-span-3"
            />
          </div>
        </section>
        
        {/* ENGINE */}
        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-6">Engine & Performance</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* FUEL TYPE */}
            <select
              {...register("engineSpecInsertDTO.fuelTypeId", {
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
              {...register("engineSpecInsertDTO.displacement", {
                valueAsNumber: true,
              })}
              className="border rounded p-2"
            />
            
            {/* HORSE POWER */}
            <input
              type="number"
              placeholder="Horse Power"
              {...register("engineSpecInsertDTO.horsePower", {
                valueAsNumber: true,
              })}
              className="border rounded p-2"
            />
            
            {/* GEARBOX */}
            <select
              {...register("engineSpecInsertDTO.gearboxType")}
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="City"
              {...register("locationInsertDTO.locationName")}
              className="border rounded p-2"
            />
            <input
              placeholder="Postal Code"
              {...register("locationInsertDTO.postalCode")}
              className="border rounded p-2"
            />
            <input
              placeholder="Longitude"
              {...register("locationInsertDTO.longitude")}
              className="border rounded p-2"
            />
            <input
              placeholder="Latitude"
              {...register("locationInsertDTO.latitude")}
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
              {...register("contactInfoInsertDTO.sellerName")}
              className="border rounded p-2"
            />
            <input
              placeholder="Email"
              {...register("contactInfoInsertDTO.email")}
              className="border rounded p-2"
            />
            <input
              placeholder="Phone 1"
              {...register("contactInfoInsertDTO.telephoneNumber1")}
              className="border rounded p-2"
            />
            <input
              placeholder="Phone 2"
              {...register("contactInfoInsertDTO.telephoneNumber2")}
              className="border rounded p-2"
            />
          </div>
        </section>
        
        {/* IMAGES */}
        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-6">Images</h2>
          
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={e => {
              if (!e.target.files) return;
              setValue("images", Array.from(e.target.files));
            }}
            className="block"
          />
        </section>
        
        {/* SUBMIT */}
        <button
          type="submit"
          className="self-end bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Create Advertisement
        </button>
      </form>
      {createdAd && (
        <section className="mt-10 bg-green-50 border border-green-300 p-6 rounded-lg mb-20">
          <h2 className="text-xl font-semibold mb-2">
            Advertisement Created Successfully
          </h2>
          
          <p>
            <strong>Name:</strong> {createdAd.adName}
          </p>
          
          <p>
            <strong>Price:</strong> {createdAd.price}
          </p>
          
          <p>
            <strong>Vehicle:</strong>{" "}
            {createdAd.vehicleDetailsDTO.state}, {createdAd.engineSpecDTO.fuelType}
          </p>
        </section>
      )}
    </>
  );
}
