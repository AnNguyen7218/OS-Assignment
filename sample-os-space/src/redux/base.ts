import {
  type BaseQueryApi,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../utils';

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = 'getState().auth.accessToken;';
    const clientToken = 'getState().auth.accessToken;';
    if (accessToken) {
      headers.set('Access-Token', `Bearer ${accessToken}`);
    }

    if (clientToken) {
      headers.set('Client-Token', `${clientToken}`);
    }
    return headers;
  }
});

export const baseQueryWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    const refreshResult = await api.dispatch('refresh token query'); // .unwrap();
    if (refreshResult?.accessToken) {
      // Update the access token in the store
      // {accessToken, refreshToken, clientToken}

      // Retry the original request with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // call log out the user
    }
  }
  return result;
};
