import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../base';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery,
  tagTypes: ['userAPI'],
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: '/self/profile',
        method: 'GET'
      })
    })
  })
});

export const { useGetUserProfileQuery } = userAPI;
