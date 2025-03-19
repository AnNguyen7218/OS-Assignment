import { SEPARATOR } from '@/utils';
export type ErrorType = { code: string; message: string };

export const transformResponse = ({
  errorCodeNeeded,
  response
}: {
  errorCodeNeeded: string;
  response?: ErrorType;
}) => {
  if (!response) return '';
  return response.code === errorCodeNeeded
    ? response.message.split(SEPARATOR)[1]
    : '';
};
