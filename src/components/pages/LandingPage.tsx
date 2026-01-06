import {Link} from "react-router";
import {useAuth} from "../auth/useAuth.ts";


export default function LandingPage() {
  
  const { isAuthenticated, isAdmin, loading } = useAuth();
  
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 text-white">
        <h1 className="text-3xl font-bold">Cart Market</h1>
        
        <Link
          to="/advertisements/new"
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Create Advertisement
        </Link>
        <Link
          to="/advertisements/all"
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          All Advertisements
        </Link>
        
        { /* Show this only an admin logs in */ }
        {!loading && isAuthenticated && isAdmin && (
          <Link
            to="/admin"
            className="bg-orange-500 text-white px-6 py-2 rounded"
          >
            Admin Panel
          </Link>
          )}
      </div>
    </>
  )
}