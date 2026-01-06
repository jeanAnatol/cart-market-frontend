export type ModelDTO = {
  id: number;
  name: string;
  makeName: string;
  vehicleType: string;
};

export type MakeDTO = {
  id: number;
  name: string;
  models: ModelDTO[];
  vehicleTypes: string[];
};

export type VehicleTypeDTO = {
  id: number;
  name: string;
  makes: MakeDTO[];
};

export type FuelTypeDTO = {
  id: number;
  name: string;
}

