import {Navigate} from "react-router-dom";
import type {JSX} from "react";
import {useAuth} from "../components/auth/useAuth.ts";

export function AdminRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  
  // prevent redirecting while loading. Otherwise it fails and returns back to /login
  if (loading) {
    return <div className="mt-40 text-center text-white">Checking permissions...</div>;
  }
  
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/forbidden" replace />;
  
  return children;
}