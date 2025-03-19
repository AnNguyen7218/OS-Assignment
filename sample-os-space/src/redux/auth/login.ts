import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../base';

export type LoginRequestProps = { email: string; password: string };
export type LoginResponseProps = {
  success: boolean;
  token: string;
  user: { id: number; email: string; name: string };
};

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
    })
  })
});

export const { useLoginMutation } = loginAPI;
