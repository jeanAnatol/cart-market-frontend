export type ModelDTO = {
  id: number;
  name: string;
  vehicleType: string;
};

export type MakeDTO = {
  id: number;
  name: string;
  models: ModelDTO[];
};

export type VehicleTypeDTO = {
  id: number;
  name: string;
  makes: MakeDTO[];
};
