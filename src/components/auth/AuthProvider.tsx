import { AuthContext } from "./AuthContext";
import {useState} from "react";
import type {AuthUser} from "../../types/auth.types.ts";
import {clearToken, decodeToken, getToken, isTokenExpired} from "./token.ts";


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const token = getToken();
    if (!token || isTokenExpired(token)) {
      clearToken();
      return null;
    }
    
    const decoded = decodeToken(token);
    if (!decoded) return null;
    
    return {
      username: decoded.sub,
      role: decoded.role,
    };
  });
  
  const logout = () => {
    clearToken();
    setUser(null);
    
    
    window.location.href = "/login";
  };
  
  const [loading] = useState(false);
  
  const isAuthenticated = !!user; // !!user results in boolean value
  const isAdmin = user?.role === "ADMIN";
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        loading,
        login: () => {},
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}