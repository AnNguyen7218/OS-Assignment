import { useAppSelector } from '@/redux/hooks';
import { selectUser } from '@/redux/user/userSelector';
import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();
  const { user: storedUser, onboardingStatus } = useAppSelector((state) =>
    selectUser(state)
  );

  if (!storedUser) {
    return <Navigate to='/login' replace />;
  }

  if (storedUser?.view === 'ADMIN') {
    return pathname === '/admin' ? children : <Navigate to='/admin' replace />;
  }

  const returnOrNavigate = (path: string) =>
    pathname === path ? children : <Navigate to={path} replace />;

  if (storedUser?.view === 'CLIENT') {
    if (onboardingStatus && onboardingStatus !== 'DONE') {
      return returnOrNavigate('/onboarding');
    }

    return returnOrNavigate('/dashboard');
  }

  return children;
};

export default ProtectedRoute;
