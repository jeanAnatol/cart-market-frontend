import {useAuth} from "../auth/useAuth.ts";
import {NavLink, Outlet} from "react-router-dom";


export default function AdminLayout() {
  const {user} = useAuth();
  
  return (
    <>
      <div className="min-h-screen flex mt-40 mb-20">
      {/* sidebar */}
        <aside className="w-64 bg-gray-900 text-white p-6 rounded-md">
          <h2 className="text-xl font-bold mb-6 ">Admin Panel</h2>
          <p className="text-sm mb-4">
            Logged in as <strong>{user?.username}</strong></p>
          
          <nav className="flex flex-col gap-2">
            
            <NavLink to="/admin/vehicle-types" className="p-2 rounded hover:bg-gray-800">
              Vehicle Types
            </NavLink>
            <NavLink to="/admin/makes" className="p-2 rounded hover:bg-gray-800">Makes</NavLink>
            <NavLink to="/admin/models" className="p-2 rounded hover:bg-gray-800">Models</NavLink>
          </nav>
        </aside>
        {/* Outlet for child routes rendering */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </>
  )
}