import {Link, useParams} from "react-router";
import {useEffect, useState} from "react";
import type {AdvertisementRead} from "../../types/advertisement.read.ts";
import {fetchAdvertisementByUuid} from "../../services/api.advertisements.ts";


export default function AdvertisementDetailsPage() {
  
  const { uuid } = useParams<{ uuid: string }>();
  const [ad, setAd] = useState<AdvertisementRead | null>(null);
  
  useEffect(() => {
    if (!uuid) return;
    fetchAdvertisementByUuid(uuid).then(setAd)
  }, [uuid]);
  
  
  return (
    <>
      <div className="max-w-xl mx-auto mt-12 border-1 border-black mt-40 p-4">
        <h1 className="text-2xl font-bold mb-4 mt-4">{ad?.adName}</h1>
        <div className="grid grid-cols-1 gap-4 text-sm mb-10">
          
          <p><strong>Vehicle State: </strong> {ad?.vehicleDetailsDTO.state}</p>
          <p className="text-xl font-semibold mb-2">Price: €{ad?.price}</p>
          <p className="mb-4">Description: {ad?.vehicleDetailsDTO.vehicleDescriptionText}</p>
        </div>
        
        <h2 className="text-2xl font-bold  mb-4 mt-4">Vehicle Details</h2>
        <div className="grid grid-cols-1 gap-4 text-sm mb-10">
          <p className="text-xl mb-2"><strong>Vehicle Type: </strong> {ad?.vehicleDetailsDTO.vehicleType}</p>
          <p className="text-xl mb-2"><strong>Year: </strong> {ad?.vehicleDetailsDTO.manufactureYear}</p>
          <p className="text-xl mb-2"><strong>Mileage: </strong> {ad?.vehicleDetailsDTO.mileage} km</p>
          <p className="text-xl mb-2"><strong>Color: </strong> {ad?.vehicleDetailsDTO.color}</p>
        </div>
        
        <h2 className="text-2xl font-bold  mb-4 mt-4">Engine Specifications</h2>
        <div className="grid grid-cols-1 gap-4 text-sm mb-10">
          <p className="text-xl mb-2"><strong>Displacement: </strong> {ad?.engineSpecDTO.displacement} cc</p>
          <p className="text-xl mb-2"><strong>Fuel:</strong> {ad?.engineSpecDTO.fuelType}</p>
          <p className="text-xl mb-2"><strong>Gearbox:</strong> {ad?.engineSpecDTO.gearboxType}</p>
          <p className="text-xl mb-2"><strong>Horse Power: </strong> {ad?.engineSpecDTO.displacement} hp</p>
        </div>
        
        <h2 className="text-2xl font-bold  mb-4 mt-4">Location and Contact Details</h2>
        <div className="grid grid-cols-1 gap-4 text-sm mb-10">
          <p className="text-xl mb-2"><strong>Location: </strong> {ad?.locationDTO.locationName}</p>
          <p className="text-xl mb-2"><strong>Postal Code: </strong> {ad?.locationDTO.postalCode}</p>
          <p className="text-xl mb-2"><strong>Seller : </strong> {ad?.contactInfoDTO.sellerName}</p>
          <p className="text-xl mb-2"><strong>Phone 1: </strong> {ad?.contactInfoDTO.telephoneNumber1}</p>
          <p className="text-xl mb-2"><strong>Phone 2: </strong> {ad?.contactInfoDTO.telephoneNumber2}</p>
          <p className="text-xl mb-2"><strong>Email: </strong> {ad?.contactInfoDTO.email}</p>
        </div>
        <div className="mt-20 mb-15">
        <Link
          to="/advertisements/all-ads"
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          All Advertisements
        </Link>
      </div>
      </div>
    </>
  )
}

