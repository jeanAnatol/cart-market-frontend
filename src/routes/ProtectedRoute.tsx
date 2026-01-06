import {useAuth} from "../components/auth/useAuth.ts";
import type {JSX} from "react";
import {Navigate} from "react-router-dom";

export function ProtectedRoute({children}: {children: JSX.Element}) {
  const {isAuthenticated, loading} = useAuth();
  
  if(loading) return null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace/>
  }
  return children;
}