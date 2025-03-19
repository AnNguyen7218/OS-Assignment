import { UserType } from './user';

export type LoginRequestProps = { email: string; password: string };
export type LoginResponseProps = {
  message: string;
  accesses: { store_id: number }[];
  tokens: {
    accessToken: string;
    clientToken?: string;
    refreshToken: string;
  };
  view: { type: string };
  user: UserType;
};
export type RefreshTokenResponse = {
  accessToken: string;
  clientToken?: string;
  refreshToken: string;
};
