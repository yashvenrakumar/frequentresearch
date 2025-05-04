// components/PublicRoute.tsx
import { JSX } from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ element, isAuthenticated }: { element: JSX.Element; isAuthenticated: boolean }) => {
  return isAuthenticated ? <Navigate to="/" replace /> : element;
};

export default PublicRoute;
