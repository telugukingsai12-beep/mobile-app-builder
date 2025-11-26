import { ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES, UserRole } from '@/lib/constants';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    // Redirect to user's appropriate dashboard if they don't have permission
    switch (userRole) {
      case 'admin':
        return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;
      case 'ngo':
        return <Navigate to={ROUTES.NGO_DASHBOARD} replace />;
      case 'volunteer':
        return <Navigate to={ROUTES.VOLUNTEER_DASHBOARD} replace />;
      case 'donor':
        return <Navigate to={ROUTES.DONOR_DASHBOARD} replace />;
      default:
        return <Navigate to={ROUTES.HOME} replace />;
    }
  }

  return <>{children}</>;
};
