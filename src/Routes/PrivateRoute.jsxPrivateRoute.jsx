import { useContext } from "react";        // ✅ useContext ঠিকভাবে import
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext"; // ✅ ঠিক path check করো

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext); // ✅ useContext ব্যবহার

  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
