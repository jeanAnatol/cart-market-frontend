import {useEffect, useState} from "react";
import type {Advertisement} from "../../types/advertisement.ts";
import {getAdvertisements} from "../../services/api.advertisements.ts";


const AdvertisementsPage = () => {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);

  useEffect(() => {
    getAdvertisements()
      .then(data => setAdvertisements(data));
  }, []);
  console.log(advertisements);
  return (
    <>

    </>
  )
}
export default AdvertisementsPage;