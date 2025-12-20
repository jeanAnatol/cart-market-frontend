import type {Advertisement} from "../types/advertisement.ts";
import {AdvertisementCarouselProps} from "./AdvertisementCarouselProps.tsx";

interface CardProps {
  ad: Advertisement
}

export function AdvertisementCard({ad}: CardProps) {
  return (
    <>
      <div className="rounded-xl border shadow-sm p-4 space-y-4">
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
    </>
  )
}