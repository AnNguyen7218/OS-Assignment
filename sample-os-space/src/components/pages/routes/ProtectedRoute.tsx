import { AuthContext } from '@/components/context/AuthProvider';
import { PropsWithChildren, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();

  const {
    user: storedUser,
    isLoading,
    onboardingStatus
  } = useContext(AuthContext);
  if (isLoading) {
    return <div className='main-text'>Loading route...</div>;
  }

  if (!storedUser) {
    return <Navigate to='/login' replace />;
  }

  if (storedUser?.view === 'ADMIN') {
    return pathname === '/admin' ? children : <Navigate to='/admin' replace />;
  }

  const returnOrNavigate = (path: string) =>
    pathname === path ? children : <Navigate to={path} replace />;

  if (storedUser?.view === 'CLIENT') {
    if (onboardingStatus && onboardingStatus === 'DONE') {
      return returnOrNavigate('/dashboard');
    }

    return returnOrNavigate('/onboarding');
  }

  return children;
};

export default ProtectedRoute;
