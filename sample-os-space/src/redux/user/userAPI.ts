import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../base';
import { UserType } from '../types/user';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery,
  tagTypes: ['userAPI'],
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: '/self/profile',
        method: 'GET'
      }),
      transformResponse(rawResponse: {
        user: UserType;
        view: { type: string };
        accesses: { store_id: number }[];
      }) {
        return {
          ...rawResponse.user,
          view: rawResponse.view.type,
          storeId: rawResponse.accesses[0].store_id
        };
      }
    })
  })
});

export const { useGetUserProfileQuery } = userAPI;
