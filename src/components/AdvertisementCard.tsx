import type {AdvertisementRead} from "../types/advertisement.read.ts";
import {AdvertisementCarouselProps} from "./AdvertisementCarouselProps.tsx";
import {Link} from "react-router-dom";

interface CardProps {
  ad: AdvertisementRead
}

export function AdvertisementCard({ad}: CardProps) {
  return (
    <>
      <Link
        to={`/advertisements/${ad.uuid}`}
        className="block hover:scale-[1.02] transition-transform"
      >
      <div className="rounded-xl shadow-sm p-2 space-y-4 border-3 border-blue-600 bg-white">
        <AdvertisementCarouselProps images={ad.imageUrl} />

        <div>
          <h3 className="text-lg font-semibold">
            {ad.adName}
          </h3>

          <p className="text-gray-500">{ad.vehicleDetailsDTO.vehicleType}</p>
          <p className="text-gray-500">{ad.engineSpecDTO.fuelType}</p>
          <p className="text-gray-500">{ad.vehicleDetailsDTO.state}</p>

          <p className="text-xl font-bold mt-2">
            €{ad.price.toLocaleString()}
          </p>
        </div>
      </div>
      </Link>
    </>
  )
}