import {useEffect, useState} from "react";
import type {AdvertisementRead} from "../../types/advertisement.read.ts";
import {Link} from "react-router-dom";
import {resolveImageUrl} from "../../services/api.imageUrl.ts";
import {deleteAdvertisement, fetchAdvertisementsByUser} from "../../services/api.advertisements.ts";
import type {UserDetailsResponse} from "../../types/auth.types.ts";
import {getCurrentUser} from "../../services/api.auth.ts";
import UpdateProfileModal from "../UpdateProfileModal.tsx";


function MyProfile() {
  
  const [user, setUser] = useState<UserDetailsResponse | null>(null);
  
  useEffect(() => {
    getCurrentUser().then(setUser).catch(console.error);
  }, []);
  
  const [open, setOpen] = useState<boolean>(false);
  
  const refreshUser = async () => {
    const updated = await getCurrentUser();
    setUser(updated);
  };
  
  if (!user) {
    return (
      <section className="bg-white p-6 rounded shadow">
        <p>Loading profile...</p>
      </section>
    );
  }
  
  return (
    <>
      <div className="pb-4">
      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">My Profile</h2>
        
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        
        <button
          onClick={() => setOpen(true)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded mb-2"
        >
          Edit Profile
        </button>
        
        {open && (
          <UpdateProfileModal
            user={user}
            onClose={() => setOpen(false)}
            onSuccess={refreshUser}
          />
        )}
      </section>
      </div>
    </>
  )
}

function MyAdvertisements() {
  
  const [ads, setAds] = useState<AdvertisementRead[]>([])
  
  
  useEffect(() => {
    fetchAdvertisementsByUser()
      .then(setAds)
      .catch(console.error);
  }, []);
  
  const handleDelete = async (uuid:string) => {
    
    if (!confirm("Are you sure you want to delete this advertisement?")) return;
    await deleteAdvertisement(uuid);
    
    setAds(
      prev => prev.filter(
        ad => ad.uuid !== uuid));
  }
  
  return (
    <>
      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">My Advertisements</h2>
        
        {ads.map(ad => (
          <div key={ad.uuid} className="flex items-center gap-4 border-b border border-gray-400 p-4 rounded mb-2">
            <img
              src={resolveImageUrl(ad.imageUrl[0])}
              className="w-24 h-24 object-cover rounded"
            />
            
            <div className="flex-1">
              <p className="font-semibold">{ad.adName}</p>
              <p>{ad.price} €</p>
            </div>
            
            <Link to={`/advertisements/update/${ad.uuid}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(ad.uuid)}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >Delete
            </button>
          </div>
        ))}
      </section>
    </>
  )
}

export default function MyAccountPage() {
  return (
    <>
      <div className="mt-40 mb-40">
        <MyProfile />
        <MyAdvertisements />
      </div>
    </>
  )
}



