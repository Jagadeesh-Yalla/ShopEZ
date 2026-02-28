import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!userInfo) {
    return <Navigate to="/login" />; // redirect if not logged in
  }

  return children; // allow access if logged in
};

export default ProtectedRoute;