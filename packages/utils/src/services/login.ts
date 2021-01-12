import { stringify } from "qs";
import { config } from "../config";
import { POST } from "../network/request";
import LOCAL_STORAGE_KEY from "../constant/localStorageKey";

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
        "Content-Type": "application/x-www-form-urlencoded",
      },
      getResponse: true,
    }
  );

  return result;
};

export const refreshToken = async () => {
  const FORM_DATA = {
    grant_type: "refresh_token", // refresh_token for refresh token
    scope: "offline_access",
    client_id: process.env.client_id,
    client_secret: process.env.client_secret,
  };

  const requestBody = {
    ...FORM_DATA,
    refresh_token: localStorage.getItem(LOCAL_STORAGE_KEY.refreshTokenKey),
  };

  const result = await POST(
    config.network.endpoint.login,
    {},
    {
      data: stringify(requestBody),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      getResponse: true,
    }
  );
  return result;
};
