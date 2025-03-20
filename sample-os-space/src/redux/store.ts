import { configureStore } from '@reduxjs/toolkit';
import { loginAPI } from './auth/loginAPI';
import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';
import { storeAPI } from './store/storeAPI';
import { userAPI } from './user/userAPI';

export const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    auth: authReducer,
    user: userReducer,
    [storeAPI.reducerPath]: storeAPI.reducer,
    [loginAPI.reducerPath]: loginAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      loginAPI.middleware,
      storeAPI.middleware,
      userAPI.middleware
    ])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
