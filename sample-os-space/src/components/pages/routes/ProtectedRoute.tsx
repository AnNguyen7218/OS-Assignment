import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

const useAuthMock = () => {
  return { isAuthenticated: true, role: 'admin' };
};

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, role } = useAuthMock();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  // if (!allowedRoles.includes(role)) {
  //   return <Navigate to='/dashboard' replace />;
  // }

  return children;
};

export default ProtectedRoute;
