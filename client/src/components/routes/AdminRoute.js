import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { currentAdmin } from "../../functions/auth";
import LoadingToRedirect from "./LoadingToRedirect";

const AdminRoute = () => {
  const user = useSelector((state) => state.user); // Directly access state.user
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then(() => setOk(true))
        .catch(() => setOk(false));
    }
  }, [user]);

  if (!user || !user.token) {
    return <Navigate to="/login" />;
  }

  if (!ok) {
    return <LoadingToRedirect />;
  }

  return <Outlet />;
};

export default AdminRoute;
