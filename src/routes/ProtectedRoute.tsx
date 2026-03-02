import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ReactNode } from "react";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const { user, loading } = auth ?? { user: null, loading: true };

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
