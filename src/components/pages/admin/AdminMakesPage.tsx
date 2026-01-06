import type {MakeDTO, VehicleTypeDTO} from "../../../types/vehicle.catalog.type.ts";
import {useEffect, useMemo, useState} from "react";
import {
  adminCreateMake,
  adminDeleteMake,
  adminFetchAllMakes,
  adminFetchVehicleTypes
} from "../../../services/api.admin.ts";


export default function AdminMakesPage() {
  
  const [vehicleTypes, setVehicleTypes] = useState<VehicleTypeDTO[]>([]);
  const [makes, setMakes] = useState<MakeDTO[]>([]);
  const [newMakeName, setNewMakeName] = useState("");
  // const [loading, setLoading] = useState<boolean>(true);
  const [selectedVehicleType, setSelectedVehicleType] = useState<string | null>(null);
  
  
  useEffect(() => {
    adminFetchVehicleTypes().then(setVehicleTypes);
    adminFetchAllMakes().then(setMakes);
  }, []);
  
  const filteredMakes = useMemo(() => {
    if (!selectedVehicleType) return [];
    return makes.filter(make =>
      make.vehicleTypes.includes(selectedVehicleType)
    );
  }, [makes, selectedVehicleType]);
  
  
  const handleCreateMake = async () => {
    if (!newMakeName || !selectedVehicleType) return;
    
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
            name: newMakeName,
            vehicleTypeId: vehicleType.id,
          }),
        ],
        { type: "application/json" }
      )
    );
    
    const created = await adminCreateMake(formData);
    
    setMakes(prev => [...prev, created]);
    setNewMakeName("");
  };
  
  const handleDelete = async (makeId: number) => {
    await adminDeleteMake(makeId);
    setMakes(prev => prev.filter(m => m.id !== makeId));
  };
  
  
  
  return (
    <>
      <div>
        <div className="bg-white p-6 rounded">
          <h2 className="text-xl font-bold mb-6">Makes</h2>
          
          {/* Vehicle Type Selector */}
          <select
            className="border p-2 mb-6 w-full bg-white"
            defaultValue=""
            onChange={e => setSelectedVehicleType(e.target.value)}
          >
            <option value="" disabled>
              Select vehicle type
            </option>
            {vehicleTypes.map(type => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
          
          {/* Create Make */}
          <div className="flex gap-2 mb-6">
            <input
              className="border p-2 flex-1"
              placeholder="New make name"
              value={newMakeName}
              onChange={e => setNewMakeName(e.target.value)}
              disabled={!selectedVehicleType}
            />
            
            <button
              className="bg-blue-600 text-white px-4 rounded disabled:bg-gray-400"
              onClick={handleCreateMake}
              disabled={!selectedVehicleType || !newMakeName}
            >
              Add
            </button>
          </div>
          
          {/* Makes List */}
          {filteredMakes.length === 0 ? (
            <p className="text-gray-500">No makes for this vehicle type.</p>
          ) : (
            <ul className="space-y-2">
              {filteredMakes.map(make => (
                <li
                  key={make.id}
                  className="flex justify-between items-center border p-3 rounded"
                >
                  <span>{make.name}</span>
                  
                  <button
                    className="text-red-500 hover:text-red-700 text-sm"
                    onClick={() => handleDelete(make.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}