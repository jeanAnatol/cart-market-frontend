import {useAuth} from "./useAuth.ts";
import {useEffect} from "react";


export function Logout() {
  const { logout } = useAuth();
  
  useEffect(() => {
    logout();
  }, [logout]);
  
  return null;
}
