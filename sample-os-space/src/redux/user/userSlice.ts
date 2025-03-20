import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../types/user';

const initialState: {
  user: (UserType & { view: string; storeId: number }) | null;
  onboardingStatus: string;
} = {
  user: null,
  onboardingStatus: ''
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        user: UserType & { view: string; storeId: number };
      }>
    ) => {
      state.user = action.payload.user;
    },
    setOnboardStatus: (state, action: PayloadAction<{ status: string }>) => {
      state.onboardingStatus = action.payload.status;
    },
    clearUser: (state) => {
      state.user = null;
    }
  }
});

export const { setUser, clearUser, setOnboardStatus } = userSlice.actions;
export default userSlice.reducer;
