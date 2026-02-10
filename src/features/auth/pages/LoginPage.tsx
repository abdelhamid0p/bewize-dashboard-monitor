import {
  
  AuthTemplate,
} from "@/shared/components/templates/AuthLayout";
import { useAppSelector } from "@/shared/hooks";
import { Navigate } from "react-router-dom";

// Export par défaut
export const LoginPage = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);

  if (isAuth) {
    return <Navigate to="/dashboard" />;
  }

  return <AuthTemplate />;
};

// Export par défaut
export default LoginPage;
