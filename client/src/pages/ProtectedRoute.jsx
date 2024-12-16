import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // יש להתקין את הספרייה


const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Access denied. You are not authorized to view this page.");
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token); // פענוח הטוקן
    const { role } = decodedToken; // שליפת ה-role מהטוקן

    if (role !== requiredRole) {
      alert("Access denied. You are not authorized to view this page.");
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.error("Invalid token:", error);
    alert("Access denied. Invalid token.");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
