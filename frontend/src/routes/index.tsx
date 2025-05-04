import { JSX } from "react";
import Home from "../pages/Home";
import ResetPassword from "../pages/auth/ResetPassword";
import Stepper from "../components/Stepper";

// Define route type
export interface AppRoute {
  path: string;
  element: JSX.Element;
}

// Public routes
export const publicRoutes: AppRoute[] = [
  // { path: "/login", element: <Login /> },
  { path: "/Stepper", element: <Stepper /> },
  { path: "/reset-password", element: <ResetPassword /> },
];

// Private routes
export const privateRoutes: AppRoute[] = [
  { path: "/", element: <Home /> },
  { path: "/home", element: <Home /> },
];
