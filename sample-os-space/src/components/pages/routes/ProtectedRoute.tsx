import { useAppSelector } from '@/redux/hooks';
import { selectUser } from '@/redux/user/userSelector';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const storedUser = useAppSelector((state) => selectUser(state));
  console.log('user:view', storedUser?.view);

  if (!storedUser) {
    return <Navigate to='/login' replace />;
  }

  if (storedUser?.view === 'ADMIN') {
    return window.location.pathname === '/admin' ? (
      children
    ) : (
      <Navigate to='/admin' replace />
    );
  }

  if (storedUser?.view === 'CLIENT') {
    // const onboardingStatus =
    //   user.store?.onboarding_procedure?.onboarding_status;
    // if (onboardingStatus && onboardingStatus !== 'DONE') {
    //   return window.location.pathname === '/onboarding' ? (
    //     children
    //   ) : (
    //     <Navigate to='/onboarding' replace />
    //   );
    // }
    return window.location.pathname === '/dashboard' ? (
      children
    ) : (
      <Navigate to='/dashboard' replace />
    );
  }

  return children;
};

export default ProtectedRoute;
