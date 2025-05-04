// components/PrivateRoute.tsx
import { JSX } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, isAuthenticated }: { element: JSX.Element; isAuthenticated: boolean }) => {
  return isAuthenticated ? element : <Navigate to="/Stepper" replace />;
};

export default PrivateRoute;
