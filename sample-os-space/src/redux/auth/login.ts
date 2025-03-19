import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../base';
import {
  LoginRequestProps,
  LoginResponseProps,
  RefreshTokenResponse
} from '../types/login';

export const loginAPI = createApi({
  reducerPath: 'loginAPI',
  baseQuery,
  tagTypes: ['loginAPI'],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponseProps, LoginRequestProps>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials
      })
    }),
    // NOTE: simulation that there is a refresh token endpoint
    refreshToken: builder.mutation<RefreshTokenResponse, void>({
      query: () => {
        const refreshToken = localStorage.getItem('refreshToken');
        return {
          url: '/auth/refresh',
          method: 'POST',
          body: { refreshToken }
        };
      }
    })
  })
});

export const { useLoginMutation, useRefreshTokenMutation } = loginAPI;
