import { useAppSelector } from '@/redux/hooks';
import { useGetStoreInfoQuery } from '@/redux/store/storeAPI';
import { UserType } from '@/redux/types/user';
import { useGetUserProfileQuery } from '@/redux/user/userAPI';
import { selectUser } from '@/redux/user/userSelector';
import { createContext, type PropsWithChildren } from 'react';

type AuthContextType = {
  user: (UserType & { view: string }) | null;
  isLoading: boolean;
  onboardingStatus: string;
  isError: boolean;
  isAdmin: boolean;
};
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  onboardingStatus: '',
  isError: false,
  isAdmin: false
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const accessToken = localStorage.getItem('accessToken');
  const { data, isLoading, isError } = useGetUserProfileQuery(
    {},
    { skip: !accessToken }
  );
  const { user: storedUser } = useAppSelector((state) => selectUser(state));
  const targetUser = storedUser ?? data;
  const isAdmin = targetUser?.view === 'ADMIN';

  const storeId = targetUser?.storeId ?? -1;
  const { data: storeInfo } = useGetStoreInfoQuery(
    { id: storeId },
    { skip: !targetUser || storeId === -1 }
  );
  const status = storeInfo?.store.onboarding_procedure.onboarding_status;
  console.log(storeInfo, targetUser, storeId);
  return (
    <AuthContext.Provider
      value={{
        user: targetUser
          ? {
              ...targetUser,
              view: targetUser?.view
            }
          : null,
        isLoading,
        onboardingStatus: status,
        isError,
        isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
