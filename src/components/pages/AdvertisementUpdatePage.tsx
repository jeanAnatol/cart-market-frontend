import AdvertisementUpdateForm from "../forms/AdvertisementUpdateForm.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import type {AdvertisementRead} from "../../types/advertisement.read.ts";
import {fetchAdvertisementByUuid} from "../../services/api.advertisements.ts";


export default function AdvertisementUpdatePage() {
  const { uuid } = useParams<{ uuid: string }>();
  const [ad, setAd] = useState<AdvertisementRead | null>(null);
  
  useEffect(() => {
    if (!uuid) return;
    fetchAdvertisementByUuid(uuid).then(setAd);
  }, [uuid]);
  
  if (!ad) {
    return <p className="mt-40 text-center">Loading advertisement...</p>;
  }
  
  return (
    <div className="mt-40 mb-20 z-50">
      <AdvertisementUpdateForm ad={ad} />
    </div>
  );
}