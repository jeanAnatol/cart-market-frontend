import {useAuth} from "../auth/useAuth.ts";
import {NavLink} from "react-router-dom";


export default function AdminLayout() {
  
  const {user, logout} = useAuth();
  
  return (
    <>
      <div className="min-h-screen flex mt-40 mb-20">
      {/* sidebar */}
        <aside className="w-64 bg-gray-900 text-white p-6">
          <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
          <p className="text-sm mb-4">
            Logged in as <strong>{user?.username}</strong>
          </p>
          
          <nav className="flex flex-col gap-2">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `p-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-800"}`
              }
            >
              Dashboard
            </NavLink>
            
            future links
            <NavLink
              to="/admin/catalog"
              className={({ isActive }) =>
                `p-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-800"}`
              }
            >
              Catalog
            </NavLink>
          </nav>
          <button
            onClick={logout}
            className="mt-10 text-sm text-red-400 hover:text-red-300"
          >
            Logout
          </button>
        </aside>
      </div>
    </>
  )
}