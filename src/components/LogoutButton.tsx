
import { useNavigate } from "react-router-dom";
import {logout} from "./auth/logout.ts";


export default function LogoutButton() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };
  
  return (
    <button
      onClick={handleLogout}
      className="text-sm text-white hover:underline"
    >
      Logout
    </button>
  );
}
