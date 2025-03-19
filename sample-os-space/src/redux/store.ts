import { configureStore } from '@reduxjs/toolkit';
import { loginAPI } from './auth/login';

export const store = configureStore({
  reducer: {
    [loginAPI.reducerPath]: loginAPI.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([loginAPI.middleware])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
