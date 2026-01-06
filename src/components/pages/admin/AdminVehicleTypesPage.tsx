import {useEffect, useState} from "react";
import type {VehicleTypeDTO} from "../../../types/vehicle.catalog.type.ts";
import {adminCreateVehicleType, adminDeleteVehicleType, adminFetchVehicleTypes} from "../../../services/api.admin.ts";

export default function AdminVehicleTypePage() {
  
  const [types, setTypes] = useState<VehicleTypeDTO[]>([]);
  const [newType, setNewType] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  
  async function loadVehicleTypes() {
    setLoading(true);
    try {
      const data = await adminFetchVehicleTypes();
      setTypes(data);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    loadVehicleTypes();
  }, [])
  
  async function handleAdd() {
    if (!newType.trim()) return;
    // save vehicle type
    await adminCreateVehicleType(newType.trim());
    // after vehicle type is saved, reset newType to ""
    setNewType("");
    loadVehicleTypes();
  }
  async function handleDelete(name: string) {
    if (!confirm(`Are you sure you want to delete "${name}" vehicle type?`)) return;
    await adminDeleteVehicleType(name);
    loadVehicleTypes();
  }
  
  if (loading) return <p>Loading vehicle types...</p>;
  
  return (
    <>
      <div className="bg-white p-6 rounded">
        <h1 className="text-xl font-bold mb-4"> Vehicle Types </h1>
        
        <div className="flex gap-2 mb-4">
          <input
            className="border p-2 rounded w-64"
            placeholder="New vehicle type"
            value={newType}
            onChange={e => setNewType(e.target.value)}
          />
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Add
          </button>
        </div>
        
        <ul className="space-y-2">
          {types.map(type => (
            <li
              key={type.id}
              className="flex justify-between items-center border p-2 rounded"
            >
              <span>{type.name}</span>
              <button
                onClick={() => handleDelete(type.name)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    
    </>
  )
}