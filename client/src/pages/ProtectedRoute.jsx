import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== requiredRole) {
    alert("Access denied. You are not authorized to view this page.");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
