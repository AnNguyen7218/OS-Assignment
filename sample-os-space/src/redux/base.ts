import {
  type BaseQueryApi,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../utils';
import { type RootState } from './store';
import { loginAPI } from './auth/loginAPI';
import { clearTokens, setTokens } from './auth/authSlice';

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (
    headers,
    api: Pick<
      BaseQueryApi,
      'getState' | 'extra' | 'endpoint' | 'type' | 'forced'
    >
  ) => {
    const state = api.getState() as RootState;
    const accessToken = state.auth.accessToken;
    const clientToken = state.auth.clientToken;

    if (accessToken) {
      headers.set('Access-Token', `Bearer ${accessToken}`);
    }

    if (clientToken) {
      headers.set('Client-Token', `${clientToken}`);
    }
    return headers;
  }
});

// NOTE: this is a simulation of a baseQuery with a refresh token and retry after refresh
export const baseQueryWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshResult = await api
      .dispatch(loginAPI.endpoints.refreshToken.initiate())
      .unwrap();
    if (refreshResult.accessToken) {
      api.dispatch(setTokens(refreshResult));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearTokens());
    }
  }
  return result;
};
