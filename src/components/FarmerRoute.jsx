import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const FarmerRoute = () => {
  const { farmer } = useAuth();
  return farmer ? <Outlet /> : <Navigate to="/farmer-login" />;
};

export default FarmerRoute;
