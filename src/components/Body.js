import React from "react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";
import ProfilePicker from "./ProfilePicker";
import { useApp } from "../context/AppContext";

const RequireProfile = ({ children }) => {
  const { profile } = useApp();
  return profile ? children : <Navigate to="/" replace />;
};

const Body = () => {
  const appRouter = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/profiles", element: <ProfilePicker /> },
    {
      path: "/browse",
      element: (
        <RequireProfile>
          <Browse />
        </RequireProfile>
      ),
    },
  ]);

  return <RouterProvider router={appRouter} />;
};

export default Body;
