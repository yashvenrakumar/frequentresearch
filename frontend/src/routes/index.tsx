import { JSX } from "react";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ResetPassword from "../pages/auth/ResetPassword";

// Define route type
export interface AppRoute {
  path: string;
  element: JSX.Element;
}

// Public routes
export const publicRoutes: AppRoute[] = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/reset-password", element: <ResetPassword /> },
];

// Private routes
export const privateRoutes: AppRoute[] = [
  { path: "/", element: <Home /> },
  { path: "/home", element: <Home /> }, 
];
