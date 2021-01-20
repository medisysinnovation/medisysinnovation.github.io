import { stringify } from 'qs';
import { config } from '../config';
import { POST } from '../network/request';

export interface LoginParamsType {
  username: string;
  password: string;
}

export const login = async (payload: LoginParamsType) => {
  const result = await POST(
    config.network.endpoint.login,
    {},
    {
      data: stringify(payload),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      getResponse: true,
    },
  );

  return result;
};
