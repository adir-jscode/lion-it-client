import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../firebase.init";
import UseAdmin from "../Hooks/UseAdmin";
import Loading from "../Shared/Loading";

const RequireAdmin = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [admin, adminLoading] = UseAdmin(user);
  let location = useLocation();
  if (loading || adminLoading) {
    return <Loading></Loading>;
  }
  if (!user || !admin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAdmin;
