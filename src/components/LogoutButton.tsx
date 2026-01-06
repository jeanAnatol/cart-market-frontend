
// import { useNavigate } from "react-router-dom";
// import {logout} from "./auth/Logout.tsx";
// import {clearToken} from "./auth/token.ts";
import {useAuth} from "./auth/useAuth.ts";


// export default function LogoutButton() {
//   const navigate = useNavigate();
//
//   const handleLogout = () => {
//     logout();
//     clearToken();
//     navigate("/", { replace: true });
//   };
//
//   return (
//     <button
//       onClick={handleLogout}
//       className="text-sm text-white hover:underline"
//     >
//       Logout
//     </button>
//   );
// }

function LogoutButton () {
  const { logout } = useAuth();
  
  return (
    <button onClick={logout} className="text-white">
      Logout
    </button>
  );
}
export default LogoutButton;
