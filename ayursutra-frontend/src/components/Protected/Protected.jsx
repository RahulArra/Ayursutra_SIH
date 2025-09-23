import React from "react";
import { useAuth } from "../../context/AuthContext";  // Fixed path - need to go up two levels
import { Navigate } from "react-router-dom";
import Nav from "../Nav/Nav";  // Fixed path

export default function Protected({ children }) {
  const { userRole } = useAuth();

  if (!userRole) return <Navigate to="/auth" replace />;

  return (
    <div>
      <Nav />
      <div className="container">{children}</div>
    </div>
  );
}