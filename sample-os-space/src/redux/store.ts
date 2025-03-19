import { configureStore } from '@reduxjs/toolkit';
import { loginAPI } from './auth/login';
import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';

export const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    auth: authReducer,
    user: userReducer,
    [loginAPI.reducerPath]: loginAPI.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([loginAPI.middleware])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
