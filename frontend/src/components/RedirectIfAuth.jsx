import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RedirectIfAuth({ children }) {
  const { user, token } = useContext(AuthContext);

  if (token && user) {
    return <Navigate to="/account" replace />;
  }

  return children;
}
