import {useNavigate} from "react-router-dom";
import {useState} from "react";

const SearchSideBar = () => {
  
  const navigate = useNavigate();
  
  const [vehicleType, setVehicleType] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [locationName, setLocationName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  // const [sortBy, setSortBy] = useState("createdAt");
  
  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (vehicleType) params.append("vehicleType", vehicleType);
    if (make) params.append("make", make);
    if (model) params.append("model", model);
    if (locationName) params.append("locationName", locationName);
    if (postalCode) params.append("postalCode", postalCode);
    
    // navigate(`/advertisements/search?${params.toString()}`);
    navigate(`/advertisements/all?${params.toString()}`);
  };
  
  return (
    <>
      <>
        <div className="p-6 flex flex-col gap-4 border-2 border-blue-500 rounded-xl bg-blue-800 w-50">
          <h2 className={"text-lg text-white"}>Search</h2>
          
          <input className="border rounded p-2 bg-white h-8 w-35"
                 type="text"
                 value={vehicleType}
                 placeholder="Vehicle Type"
                 onChange={(e) => setVehicleType(e.target.value)}
          />
          
          <input className="border rounded p-2 bg-white h-8 w-35"
                 type="text"
                 value={make}
                 placeholder="Make"
                 onChange={(e) => setMake(e.target.value)}
          />
          <input className="border rounded p-2 bg-white h-8 w-35"
                 type="text"
                 value={model}
                 placeholder="Model"
                 onChange={(e) => setModel(e.target.value)}
          />
          <input className="border rounded p-2 bg-white h-8 w-35"
                 type="text"
                 value={locationName}
                 placeholder="Location"
                 onChange={(e) => setLocationName(e.target.value)}
          />
          <input className="border rounded p-2 bg-white h-8 w-35"
                 type="text"
                 value={postalCode}
                 placeholder="Postal Code"
                 onChange={e => setPostalCode(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white py-2 rounded hover:bg-green-500 mt-4 mr-2"
          >
            Search
          </button>
        </div>
      </>
    
    </>
  )
}
export default SearchSideBar;