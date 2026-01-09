import {useEffect, useMemo, useState} from "react";
import type {MakeDTO, VehicleTypeDTO} from "../../../types/vehicle.catalog.type.ts";
import {
  adminAddVehicleTypeToMake,
  adminCreateMake,
  adminDeleteMake,
  adminFetchAllMakes,
  adminFetchVehicleTypes, adminRemoveVehicleTypeFromMake
} from "../../../services/api.admin.ts";


export default function AdminMakesPage() {
  const [vehicleTypes, setVehicleTypes] = useState<VehicleTypeDTO[]>([]);
  const [makes, setMakes] = useState<MakeDTO[]>([]);

  const [newMakeName, setNewMakeName] = useState("");
  const [vehicleTypeToAdd, setVehicleTypeToAdd] = useState<number | null>(null);
  const [selectedVehicleTypeIds, setSelectedVehicleTypeIds] = useState<number[]>([]);

  const [filterVehicleType, setFilterVehicleType] = useState<string | null>(null);

  useEffect(() => {
    adminFetchVehicleTypes().then(setVehicleTypes);
    adminFetchAllMakes().then(setMakes);
  }, []);

  // Filter makes by vehicle type name
  const filteredMakes = useMemo(() => {
    if (!filterVehicleType) return [];
    return makes.filter(make =>
      make.vehicleTypes.includes(filterVehicleType)
    );
  }, [makes, filterVehicleType]);

  // Vehicle type id from name
  const getVehicleTypeIdByName = (name: string): number | undefined =>
    vehicleTypes.find(vt => vt.name === name)?.id;

  const handleAddTypeToExistingMake = async (
    makeId: number,
    typeId: number
  ) => {
    await adminAddVehicleTypeToMake(makeId, typeId);

    setMakes(prev =>
      prev.map(make =>
        make.id === makeId
          ? {
            ...make,
            vehicleTypes: [
              ...make.vehicleTypes,
              vehicleTypes.find(vt => vt.id === typeId)!.name,
            ],
          }
          : make
      )
    );
  };

  const handleRemoveTypeFromExistingMake = async (
    makeId: number,
    typeName: string
  ) => {
    const typeId = getVehicleTypeIdByName(typeName);
    if (!typeId) return;

    await adminRemoveVehicleTypeFromMake(makeId, typeId);

    setMakes(prev =>
      prev.map(make =>
        make.id === makeId
          ? {
            ...make,
            vehicleTypes: make.vehicleTypes.filter(t => t !== typeName),
          }
          : make
      )
    );
  };

  // Add vehicle type to createdMake
  const handleAddVehicleType = () => {
    if (vehicleTypeToAdd === null) return;
    if (selectedVehicleTypeIds.includes(vehicleTypeToAdd)) return;

    setSelectedVehicleTypeIds(prev => [...prev, vehicleTypeToAdd]);
    setVehicleTypeToAdd(null);
  };

  // Remove vehicle type before saving
  const handleRemoveVehicleType = (id: number) => {
    setSelectedVehicleTypeIds(prev => prev.filter(vtId => vtId !== id));
  };

  //Create Make
  const handleCreateMake = async () => {
    if (!newMakeName || selectedVehicleTypeIds.length === 0) return;

    const payload = {
      name: newMakeName,
      vehicleTypeId: selectedVehicleTypeIds,
    };

    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(payload)], { type: "application/json" })
    );

    const created = await adminCreateMake(formData);

    setMakes(prev => [...prev, created]);
    setNewMakeName("");
    setSelectedVehicleTypeIds([]);
    setVehicleTypeToAdd(null);
  };

  const handleDelete = async (makeId: number) => {
    await adminDeleteMake(makeId);
    setMakes(prev => prev.filter(m => m.id !== makeId));
  };

  return (
    <div className="bg-white p-6 rounded max-w-3xl">
      <h2 className="text-xl font-bold mb-6">Makes</h2>

      {/* filter */}
      <select
        className="border p-2 mb-6 w-full bg-white"
        defaultValue=""
        onChange={e => setFilterVehicleType(e.target.value)}
      >
        <option value="" disabled>
          Filter by vehicle type
        </option>
        {vehicleTypes.map(vt => (
          <option key={vt.id} value={vt.name}>
            {vt.name}
          </option>
        ))}
      </select>

      {/* create Make */}
      <div className="border p-4 rounded mb-6">
        <h3 className="font-semibold mb-4">Create new Make</h3>

        <input
          className="border p-2 w-full mb-4"
          placeholder="Make name"
          value={newMakeName}
          onChange={e => setNewMakeName(e.target.value)}
        />

        {/* add vehicle type */}
        <div className="flex gap-2 mb-4">
          <select
            className="border p-2 flex-1 bg-white"
            value={vehicleTypeToAdd ?? ""}
            onChange={e => setVehicleTypeToAdd(Number(e.target.value))}
          >
            <option value="" disabled>
              Select vehicle type
            </option>
            {vehicleTypes.map(vt => (
              <option
                key={vt.id}
                value={vt.id}
                disabled={selectedVehicleTypeIds.includes(vt.id)}
              >
                {vt.name}
              </option>
            ))}
          </select>

          <button
            className="bg-gray-700 text-white px-4 rounded disabled:bg-gray-400"
            onClick={handleAddVehicleType}
            disabled={vehicleTypeToAdd === null}
          >
            Add type
          </button>
        </div>

        {/* reference list */}
        {selectedVehicleTypeIds.length > 0 && (
          <ul className="mb-4 space-y-2">
            {selectedVehicleTypeIds.map(id => {
              const vt = vehicleTypes.find(v => v.id === id);
              if (!vt) return null;

              return (
                <li
                  key={id}
                  className="flex justify-between items-center border p-2 rounded"
                >
                  <span>{vt.name}</span>
                  <button
                    className="text-red-500 text-sm"
                    onClick={() => handleRemoveVehicleType(id)}
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
          onClick={handleCreateMake}
          disabled={!newMakeName || selectedVehicleTypeIds.length === 0}
        >
          Save Make
        </button>
      </div>

      {/* makes list */}
      {filterVehicleType && filteredMakes.length === 0 ? (
        <p className="text-gray-500">No makes for this vehicle type.</p>
      ) : (
        <ul className="space-y-2">
          {filteredMakes.map(make => (
            <li
              key={make.id}
              className="border p-3 rounded space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">{make.name}</span>
                <button
                  className="text-red-500 text-sm"
                  onClick={() => handleDelete(make.id)}
                >
                  Delete
                </button>
              </div>

              {/* Assigned Vehicle Types */}
              <ul className="space-y-1">
                {make.vehicleTypes.map(type => (
                  <li
                    key={type}
                    className="flex justify-between items-center text-sm border px-2 py-1 rounded"
                  >
                    <span>{type}</span>
                    <button
                      className="text-red-500"
                      onClick={() =>
                        handleRemoveTypeFromExistingMake(make.id, type)
                      }
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>

              {/* Add Vehicle Type */}
              <div className="flex gap-2">
                <select
                  className="border p-1 flex-1 bg-white text-sm"
                  onChange={e =>
                    handleAddTypeToExistingMake(
                      make.id,
                      Number(e.target.value)
                    )
                  }
                  defaultValue=""
                >
                  <option value="" disabled>
                    Add vehicle type
                  </option>
                  {vehicleTypes
                    .filter(vt => !make.vehicleTypes.includes(vt.name))
                    .map(vt => (
                      <option key={vt.id} value={vt.id}>
                        {vt.name}
                      </option>
                    ))}
                </select>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}