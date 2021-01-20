import request from './baseRequest';
import { RequestOptionsInit } from 'umi-request';
import LOCAL_STORAGE_KEY from '../constant/localStorageKey';
import UnauthorizedError from './UnauthorizedException';
import { saveAuthToken } from '../helper/localStorage';
import { stringify } from 'qs';
import { config } from '../config';
import { history } from '@/.umi/core/history';
//const useHistory = () => ({ replace: (a: string) => {} });

export const refreshToken = async () => {
  const FORM_DATA = {
    grant_type: 'refresh_token', // refresh_token for refresh token
    scope: 'offline_access',
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
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      getResponse: true,
    },
  );
  return result;
};

const getHeaders = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessTokenKey);

  return {
    authorization: `Bearer ${token}`,
    // 'Content-Type': 'application/json',
  };
};

const doRefreshTokenFirst = async () => {
  const hasRefreshToken = !!localStorage.getItem(
    LOCAL_STORAGE_KEY.refreshTokenKey,
  );
  if (!hasRefreshToken) return false;

  const result = await refreshToken();
  if (result && result.access_token) {
    const {
      access_token: accessToken,
      refresh_token: refreshAccessToken,
    } = result;
    saveAuthToken({
      access_token: accessToken,
      refresh_token: refreshAccessToken,
    });
    return true;
  }
  return false;
};

export const GET = async (
  url: string,
  payload?: any,
  overrideOptions: RequestOptionsInit | undefined = {},
) => {
  const options = {
    params: payload,
    headers: getHeaders(),
    getResponse: false,
    ...overrideOptions,
  };

  const streamTypeList = ['arrayBuffer', 'blob'];
  try {
    const result = await request.get(url, options);
    if (
      overrideOptions.responseType &&
      streamTypeList.indexOf(overrideOptions.responseType) > -1
    )
      return result;

    return result && result.data;
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      const isTokenRefresh = await doRefreshTokenFirst();

      if (isTokenRefresh) {
        /* call getHeaders() again to use latest access token */
        const result = await request.get(url, {
          ...options,
          headers: getHeaders(),
        });
        if (
          overrideOptions.responseType &&
          streamTypeList.indexOf(overrideOptions.responseType) > -1
        )
          return result;

        return result && result.data;
      }

      history.replace('/user/login');
    }

    return undefined;
  }
};

export const POST = async (
  url: string,
  payload: any,
  overrideOptions: RequestOptionsInit | undefined = {},
) => {
  const options = {
    data: payload,
    getResponse: false,
    headers: getHeaders(),
    ...overrideOptions,
  };
  try {
    const result = await request.post(url, options);
    const streamTypeList = ['arrayBuffer', 'blob'];
    if (
      overrideOptions.responseType &&
      streamTypeList.indexOf(overrideOptions.responseType) > -1
    )
      return result;

    return result?.data ?? true;
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      const isTokenRefresh = await doRefreshTokenFirst();

      if (isTokenRefresh) {
        /* call getHeaders() again to use latest access token */
        const result = await request.post(url, {
          ...options,
          headers: getHeaders(),
        });
        return result?.data ?? true;
      }
      history.replace('/user/login');
    }

    return undefined;
  }
};

export const PUT = async (
  url: string,
  payload: any,
  overrideOptions: RequestOptionsInit | undefined = {},
) => {
  const options = {
    ...overrideOptions,
    data: { ...payload },
    getResponse: false,
    headers: getHeaders(),
  };
  try {
    const result = await request.put(url, options);
    return result?.data ?? true;
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      const isTokenRefresh = await doRefreshTokenFirst();

      if (isTokenRefresh) {
        /* call getHeaders() again to use latest access token */
        const result = await request.put(url, {
          ...options,
          headers: getHeaders(),
        });
        return (result && result.data) ?? true;
      }
      history.replace('/user/login');
    }

    return undefined;
  }
};

export const DELETE = async (url: string, overrideOptions = {}) => {
  const options = {
    ...overrideOptions,
    headers: getHeaders(),
    getResponse: false,
  };
  try {
    const result = await request.delete(url, options);
    return result?.data ?? true;
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      const isTokenRefresh = await doRefreshTokenFirst();

      if (isTokenRefresh) {
        /* call getHeaders() again to use latest access token */
        const result = await request.put(url, {
          ...options,
          headers: getHeaders(),
        });
        return result?.data ?? true;
      }
      history.replace('/user/login');
    }

    return undefined;
  }
};
