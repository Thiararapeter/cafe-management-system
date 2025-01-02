import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect cashiers to POS page if they try to access dashboard
  if (user.role === "cashier" && window.location.pathname === "/dashboard") {
    return <Navigate to="/orders" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;