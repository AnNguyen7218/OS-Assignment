import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../base';

export const storeAPI = createApi({
  reducerPath: 'storeAPI',
  baseQuery,
  tagTypes: ['storeAPI'],
  endpoints: (builder) => ({
    getStoreInfo: builder.query<any, { id: number }>({
      query: ({ id }) => {
        return {
          url: `/store/${id}`,
          method: 'GET'
        };
      }
    })
  })
});

export const { useGetStoreInfoQuery, useLazyGetStoreInfoQuery } = storeAPI;
