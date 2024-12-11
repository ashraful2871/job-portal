import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivetRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  const location = useLocation();

  if (user) {
    return children;
  }

  if (loading) {
    return <span className="loading loading-ring loading-lg"></span>;
  }
  return <Navigate to="/login" state={location?.pathname}></Navigate>;
};

export default PrivetRoute;
