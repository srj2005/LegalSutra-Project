import { Navigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const { username } = useParams(); // Get the username from the URL
  const location = useLocation(); // Get current route

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if the logged-in user matches the username in the URL
  if (username && user.displayName !== username) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
