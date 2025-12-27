import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { advertisementInsertSchema } from "../../schemas/advertisement.insert.schema";
import type { AdvertisementInsert } from "../../types/advertisement.insert";
import type {VehicleTypeDTO} from "../../types/vehicle.catalog.type.ts";

import { fetchVehicleCatalog } from "../../services/api.vehicle.catalog.ts";
import { createAdvertisement } from "../../services/api.advertisements.ts";




export default function AdvertisementCreateForm() {
  
  const [vehicleTypes, setVehicleTypes] = useState<VehicleTypeDTO[]>([]);
  // const [makes, setMakes] = useState<MakeDTO[]>([]);
  // const [models, setModels] = useState<ModelDTO[]>([]);
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AdvertisementInsert>({
    resolver: zodResolver(advertisementInsertSchema),
    defaultValues: {
      userId: 1,
    },
  });
  
  /* -----------------------------
     Load catalog
  ------------------------------ */
  useEffect(() => {
    fetchVehicleCatalog().then(setVehicleTypes);
  }, []);
  
  /* -----------------------------
     Watched values
  ------------------------------ */
  const vehicleTypeId = watch("vehicleDetailsInsertDTO.vehicleTypeId");
  const makeId = watch("vehicleDetailsInsertDTO.makeId");
  
  /* -----------------------------
     Derived selections
  ------------------------------ */
  const selectedVehicleType = useMemo(
    () => vehicleTypes.find(vt => vt.id === vehicleTypeId),
    [vehicleTypes, vehicleTypeId]
  );
  
  const makes = selectedVehicleType?.makes ?? [];
  
  const selectedMake = useMemo(
    () => makes.find(m => m.id === makeId),
    [makes, makeId]
  );
  
  // const models = selectedMake?.models ?? [];
  
  const models = useMemo(() => {
    if (!selectedMake || !selectedVehicleType) return [];
    
    return selectedMake.models.filter(
      model => model.vehicleType === selectedVehicleType.name
    );
  }, [selectedMake, selectedVehicleType]);
  
  /* -----------------------------
     Submit
  ------------------------------ */
  const onSubmit = async (data: AdvertisementInsert) => {
    const formData = new FormData();
    
    const { images, ...jsonPayload } = data;
    
    formData.append(
      "advertisement",
      new Blob([JSON.stringify(jsonPayload)], {
        type: "application/json",
      })
    );
    
    images?.forEach(img => formData.append("images", img));
    
    await createAdvertisement(formData);
  };
  
  /* -----------------------------
     Render
  ------------------------------ */
  return (
    <form className={"mt-50"} onSubmit={handleSubmit(onSubmit)}>
      
      {/* PRICE */}
      <input
        type="number"
        placeholder="Price"
        {...register("price", { valueAsNumber: true })}
      />
      {errors.price && <p>{errors.price.message}</p>}
      
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
      />
      
      {/* MILEAGE */}
      <input
        type="number"
        placeholder="Mileage"
        {...register("vehicleDetailsInsertDTO.mileage", {
          valueAsNumber: true,
        })}
      />
      
      {/* COLOR */}
      <input
        placeholder="Color"
        {...register("vehicleDetailsInsertDTO.color")}
      />
      
      {/* STATE */}
      <select {...register("vehicleDetailsInsertDTO.state")}>
        <option value="NEW">New</option>
        <option value="USED">Used</option>
      </select>
      
      {/* DESCRIPTION */}
      <textarea
        placeholder="Description"
        {...register("vehicleDetailsInsertDTO.vehicleDescriptionText")}
      />
      
      {/* ENGINE */}
      <input
        type="number"
        placeholder="Displacement"
        {...register("engineSpecInsertDTO.displacement", {
          valueAsNumber: true,
        })}
      />
      
      <input
        type="number"
        placeholder="Horse Power"
        {...register("engineSpecInsertDTO.horsePower", {
          valueAsNumber: true,
        })}
      />
      
      <select {...register("engineSpecInsertDTO.gearboxType")}>
        <option value="Manual">Manual</option>
        <option value="Automatic">Automatic</option>
      </select>
      
      {/* CONTACT */}
      <input
        placeholder="Seller name"
        {...register("contactInfoInsertDTO.sellerName")}
      />
      
      <input
        placeholder="Email"
        {...register("contactInfoInsertDTO.email")}
      />
      
      <input
        placeholder="Phone 1"
        {...register("contactInfoInsertDTO.telephoneNumber1")}
      />
      
      <input
        placeholder="Phone 2"
        {...register("contactInfoInsertDTO.telephoneNumber2")}
      />
      
      {/* LOCATION */}
      <input
        placeholder="City"
        {...register("locationInsertDTO.locationName")}
      />
      
      <input
        placeholder="Postal Code"
        {...register("locationInsertDTO.postalCode")}
      />
      
      <input
        placeholder="Longitude"
        {...register("locationInsertDTO.longitude")}
      />
      
      <input
        placeholder="Latitude"
        {...register("locationInsertDTO.latitude")}
      />
      
      {/* IMAGES */}
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={e => {
          if (!e.target.files) return;
          setValue("images", Array.from(e.target.files));
        }}
      />
      
      <button type="submit">Create Advertisement</button>
    </form>
  );
}
