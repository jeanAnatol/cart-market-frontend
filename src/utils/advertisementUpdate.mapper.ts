import type {FuelTypeDTO, VehicleTypeDTO} from "../types/vehicle.catalog.type.ts";
import type {AdvertisementRead} from "../types/advertisement.read.ts";


export function mapToUpdateIds(
  ad: AdvertisementRead,
  vehicleTypes: VehicleTypeDTO[],
  fuelTypes: FuelTypeDTO[]
) {
  const vehicleType = vehicleTypes.find(
    vehicleType => vehicleType.name === ad.vehicleDetailsDTO.vehicleType
  );
  
  const make = vehicleType?.makes.find(
    make => make.name === ad.vehicleDetailsDTO.make
  );
  
  const model = make?.models.find(
    model => model.name === ad.vehicleDetailsDTO.model
  );
  
  const fuelType = fuelTypes.find(
    fuelType => fuelType.name === ad.engineSpecDTO.fuelType
  );
  
  return {
    vehicleTypeId: vehicleType?.id,
    makeId: make?.id,
    modelId: model?.id,
    fuelTypeId: fuelType?.id,
  };
}