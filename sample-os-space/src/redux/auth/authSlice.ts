import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  clientToken: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  clientToken: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string; clientToken?: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.clientToken = action.payload.clientToken || null;
    },
    clearTokens: (state) => {
      state.accessToken = null;
      state.clientToken = null;
    }
  }
});

export const { setTokens, clearTokens } = authSlice.actions;
export default authSlice.reducer;
