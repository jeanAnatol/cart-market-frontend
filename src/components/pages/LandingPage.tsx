import {Link} from "react-router";


export default function LandingPage() {
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
      </div>
    </>
  )
}