import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../types/user';

const initialState: { user: (UserType & { view: string }) | null } = {
  user: null
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: UserType & { view: string } }>
    ) => {
      state.user = action.payload.user || null;
    },
    clearUser: (state) => {
      state.user = null;
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
