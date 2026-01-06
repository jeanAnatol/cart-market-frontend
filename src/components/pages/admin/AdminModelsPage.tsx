import {useEffect, useMemo, useState} from "react";
import type {MakeDTO, ModelDTO, VehicleTypeDTO} from "../../../types/vehicle.catalog.type.ts";
import {
  adminCreateModel, adminDeleteModel,
  adminFetchAllMakes,
  adminFetchAllModels,
  adminFetchVehicleTypes
} from "../../../services/api.admin.ts";


export default function AdminModelsPage() {
  const [vehicleTypes, setVehicleTypes] = useState<VehicleTypeDTO[]>([]);
  const [makes, setMakes] = useState<MakeDTO[]>([]);
  const [models, setModels] = useState<ModelDTO[]>([]);
  
  const [selectedVehicleType, setSelectedVehicleType] = useState<string | null>(null);
  const [selectedMakeId, setSelectedMakeId] = useState<number | null>(null);
  const [newModelName, setNewModelName] = useState("");
  
  useEffect(() => {
    adminFetchVehicleTypes().then(setVehicleTypes);
    adminFetchAllMakes().then(setMakes);
    adminFetchAllModels().then(setModels);
  }, []);
  
  /* Filter makes by vehicle type name */
  const filteredMakes = useMemo(() => {
    if (!selectedVehicleType) return [];
    return makes.filter(make =>
      make.vehicleTypes.includes(selectedVehicleType)
    );
  }, [makes, selectedVehicleType]);
  
  /* Filter models by selected make + vehicle type */
  const filteredModels = useMemo(() => {
    if (!selectedVehicleType || !selectedMakeId) return [];
    const make = makes.find(m => m.id === selectedMakeId);
    if (!make) return [];
    
    return models.filter(
      m =>
        m.makeName === make.name &&
        m.vehicleType === selectedVehicleType
    );
  }, [models, makes, selectedMakeId, selectedVehicleType]);
  
  const handleCreateModel = async () => {
    if (!newModelName || !selectedMakeId || !selectedVehicleType) return;
    
    const vehicleType = vehicleTypes.find(
      vt => vt.name === selectedVehicleType
    );
    if (!vehicleType) return;
    
    const formData = new FormData();
    formData.append(
      "data",
      new Blob(
        [
          JSON.stringify({
            name: newModelName,
            makeId: selectedMakeId,
            vehicleTypeId: vehicleType.id,
          }),
        ],
        { type: "application/json" }
      )
    );
    
    const created = await adminCreateModel(formData);
    setModels(prev => [...prev, created]);
    setNewModelName("");
  };
  
  const handleDelete = async (modelId: number) => {
    await adminDeleteModel(modelId);
    setModels(prev => prev.filter(m => m.id !== modelId));
  };
  
  
  
  
  return (
    <>
      <div className="bg-white p-6 rounded">
        <h1 className="text-xl font-bold mb-6">Models</h1>
        
        
        {/* Vehicle Type */}
        <select
          className="border p-2 mb-4 w-full"
          defaultValue=""
          onChange={e => {
            setSelectedVehicleType(e.target.value);
            setSelectedMakeId(null);
          }}
        >
          <option value="" disabled>
            Select vehicle type
          </option>
          {vehicleTypes.map(vt => (
            <option key={vt.id} value={vt.name}>
              {vt.name}
            </option>
          ))}
        </select>
        
        {/* Make */}
        {selectedVehicleType && (
          <select
            className="border p-2 mb-4 w-full"
            defaultValue=""
            onChange={e => setSelectedMakeId(Number(e.target.value))}
          >
            <option value="" disabled>
              Select make
            </option>
            {filteredMakes.map(make => (
              <option key={make.id} value={make.id}>
                {make.name}
              </option>
            ))}
          </select>
        )}
        
        {/* Create model */}
        {selectedMakeId && (
          <div className="flex gap-2 mb-6">
            <input
              className="border p-2 flex-1"
              placeholder="New model name"
              value={newModelName}
              onChange={e => setNewModelName(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white px-4 rounded"
              onClick={handleCreateModel}
            >
              Add
            </button>
          </div>
        )}
        
        {/* Models list */}
        {filteredModels.length === 0 ? (
          <p className="text-gray-500">No models found.</p>
        ) : (
          <ul className="space-y-2">
            {filteredModels.map(model => (
              <li
                key={model.id}
                className="flex justify-between items-center border p-3 rounded"
              >
                <span>{model.name}</span>
                <button
                  className="text-red-500 text-sm"
                  onClick={() => handleDelete(model.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}