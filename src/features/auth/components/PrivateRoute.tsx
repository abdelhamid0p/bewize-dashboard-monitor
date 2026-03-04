import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/shared/hooks";
import { useAuthInit } from "../hooks/useAuthInit";

interface PrivateRouteProps {
  children: React.ReactNode;
}

/**
 * Composant de protection des routes.
 * Redirige vers /login si l'utilisateur n'est pas authentifié.
 * Affiche un loader pendant la vérification de l'authentification.
 */
export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { initialized } = useAuthInit();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  // Afficher un loader pendant l'initialisation
  if (!initialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Rediriger vers login si non authentifié
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
