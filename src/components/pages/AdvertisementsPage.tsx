
import {useEffect, useState} from "react";
import type {AdvertisementRead} from "../../types/advertisement.read.ts";
import {getAdvertisements, searchAdvertisements} from "../../services/api.advertisements.ts";
import {AdvertisementCard} from "../AdvertisementCard.tsx";
import {useSearchParams} from "react-router-dom";
import type {Paginated} from "../../types/paginated.type.ts";

const AdvertisementsPage = () => {
  
  const [advertisements, setAdvertisements] = useState<AdvertisementRead[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<Paginated<AdvertisementRead> | null>(null);
  
  useEffect(() => {
    searchAdvertisements(searchParams).then(setPage);
  }, [searchParams]);

  useEffect(() => {
    getAdvertisements()
      // .then(data => setAdvertisements(data));
      .then(setAdvertisements)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (<p>Loading...</p>)
  console.log(advertisements);
  
  const goToPage = (pageNumber: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", String(pageNumber));
    setSearchParams(newParams);
  };
  
  if (!page) {
    return <p>Loading advertisements...</p>;
  }

  return (
    <>
      <div className="mb-40">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-40 mb-10">
          
          {page?.data.map(ad => (
            <AdvertisementCard key={ad.uuid} ad={ad}/>
          ))}
        </div>
          
          {/* Pagination */}
          <div className="flex justify-between items-center text-white">
            <button
              disabled={page.currentPage === 0}
              onClick={() => goToPage(page.currentPage - 1)}
              className="px-4 py-2 border rounded disabled:opacity-50 bg-white text-black"
            >
              Previous
            </button>
            
            <span className="text-sm">
            Page {page.currentPage + 1} of {page.totalPages}
          </span>
          
          <button
            disabled={page.currentPage >= page.totalPages - 1}
            onClick={() => goToPage(page.currentPage + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50 bg-white text-black"
          >
            Next
          </button>
        </div>
      </div>
    </>
  )
}
export default AdvertisementsPage;