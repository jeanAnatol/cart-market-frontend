
import {useEffect, useState} from "react";
import type {AdvertisementRead} from "../../types/advertisement.read.ts";
import {getAdvertisements} from "../../services/api.advertisements.ts";

import {AdvertisementCard} from "../AdvertisementCard.tsx";


const AdvertisementsPage = () => {
  const [advertisements, setAdvertisements] = useState<AdvertisementRead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdvertisements()
      // .then(data => setAdvertisements(data));
      .then(setAdvertisements)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (<p>Loading...</p>)
  console.log(advertisements);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-40">
        {advertisements.map(ad => (
          <AdvertisementCard key={ad.uuid} ad={ad}/>
        ))}
      </div>

    </>
  )
}
export default AdvertisementsPage;