import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const UserRoute = () => {
  const user = useSelector((state) => state.user); // Directly access state.user

  if (!user || !user.token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default UserRoute;
