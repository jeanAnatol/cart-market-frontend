import {useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import type {AdvertisementRead} from "../../types/advertisement.read.ts";
import { fetchAdvertisementByUuid } from "../../services/api.advertisements.ts";
import AdvertisementImages from "../AdvertisementImages.tsx";

export default function AdvertisementDetailsPage() {
  const { uuid } = useParams<{ uuid: string }>()
  const [ad, setAd] = useState<AdvertisementRead | null>(null)
  
  useEffect(() => {
    if (!uuid) return
    fetchAdvertisementByUuid(uuid).then(setAd)
  }, [uuid])
  
  if (!ad) {
    return <p className="text-center text-white mt-70">Loading advertisement...</p>
  }
  
  return (
    <>
    <div className="max-w-2xl mx-auto mt-40 mb-40 p-6 bg-white rounded shadow">
      
      {/* IMAGES */}
      <AdvertisementImages images={ad.imageUrl} />
      
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{ad.adName}</h1>
        <p className="text-2xl text-blue-600 font-semibold mt-2">
          €{ad.price}
        </p>
      </div>
      
      {/* DESCRIPTION */}
      <p className="mb-10 text-gray-700">
        {ad.vehicleDetailsDTO.vehicleDescriptionText}
      </p>
      
      <div className="grid grid-cols-3 gap-6">
      {/* VEHICLE DETAILS */}
      <div className="mb-10">
        <h1 className="text-xl"><strong>Vehicle Details</strong></h1>
        <Detail label="Type" value={ad.vehicleDetailsDTO.vehicleType} />
        <Detail label="Year" value={ad.vehicleDetailsDTO.manufactureYear} />
        <Detail label="Mileage" value={`${ad.vehicleDetailsDTO.mileage} km`} />
        <Detail label="Color" value={ad.vehicleDetailsDTO.color} />
      </div>
      {/* ENGINE */}
      <div className="mb-10">
        <h1 className="text-xl"><strong>Engine Specifications</strong></h1>
        <Detail label="Displacement" value={`${ad.engineSpecDTO.displacement} cc`} />
        <Detail label="Fuel" value={ad.engineSpecDTO.fuelType} />
        <Detail label="Gearbox" value={ad.engineSpecDTO.gearboxType} />
        <Detail label="Horse Power" value={`${ad.engineSpecDTO.horsePower} hp`} />
      </div>
      
      {/* CONTACT */}
      <div className="mb-10">
        <h1 className="text-xl"><strong>Location and Contact Info</strong></h1>
        <Detail label="Location" value={ad.locationDTO.locationName} />
        <Detail label="Postal Code" value={ad.locationDTO.postalCode} />
        <Detail label="Seller" value={ad.contactInfoDTO.sellerName} />
        <Detail label="Phone 1" value={ad.contactInfoDTO.telephoneNumber1} />
        <Detail label="Phone 2" value={ad.contactInfoDTO.telephoneNumber2} />
        <Detail label="Email" value={ad.contactInfoDTO.email} />
      </div>
      </div>
      
      <Link
        to="/advertisements/all"
        className="inline-block mt-10 bg-blue-600 text-white px-6 py-3 rounded"
      >
        All Advertisements
      </Link>
    </div>
    </>
  )
}

function Detail({
                  label,
                  value,
                }: {
  label: string
  value: React.ReactNode
}) {
  return (
    <p className="mb-2">
      <strong>{label}:</strong> {value}
    </p>
  )
}
