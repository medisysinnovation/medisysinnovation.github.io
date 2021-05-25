import { RequestOptionsInit } from 'umi-request';
import { UnauthorizedError } from './exception';
import { saveAuthToken } from '../helper/localStorage';
import { stringify } from 'qs';
import { MIConfig } from '../config';
import { getKey } from '../helper';

const request = MIConfig.getConfig('request');
export const refreshToken = async () => {
  const FORM_DATA = {
    grant_type: 'refresh_token', // refresh_token for refresh token
    scope: 'offline_access',
    client_id: process.env.client_id,
    client_secret: process.env.client_secret,
  };

  const requestBody = {
    ...FORM_DATA,
    refresh_token: localStorage.getItem(getKey('refreshToken')),
  };

  const result = await POST(
    MIConfig.getConfig('urls').login,
    {},
    {
      data: stringify(requestBody),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      getResponse: true,
    },
  );
  return result?.data;
};

const getHeaders = () => {
  const token = localStorage.getItem(getKey('accessToken'));

  return {
    authorization: `Bearer ${token}`,
    // 'Content-Type': 'application/json',
  };
};

const doRefreshTokenFirst = async () => {
  const refreshAccessToken = getKey('refreshToken');
  if (!refreshAccessToken) return false;

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
): Promise<any> => {
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
    ) {
      return result;
    }
    if (result?.status === 0) {
      return result.data;
    }
    return result;
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      const isTokenRefresh = await doRefreshTokenFirst();
      if (isTokenRefresh) {
        return await GET(url, payload, overrideOptions);

        /* call getHeaders() again to use latest access token */
        // const result = await request.get(url, {
        //   ...options,
        //   headers: getHeaders(),
        // });
        // if (
        //   overrideOptions.responseType &&
        //   streamTypeList.indexOf(overrideOptions.responseType) > -1
        // ) {
        //   return result;
        // }
        // if (result?.status === 0) {
        //   return result.data;
        // }
        // return result;
      }
    }
    throw error;
  }
};

export const POST = async (
  url: string,
  payload: any,
  overrideOptions: RequestOptionsInit | undefined = {},
): Promise<any> => {
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
    ) {
      return result;
    }

    if (result?.status === 0) {
      return result.data;
    }
    return result || true;
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      const isTokenRefresh = await doRefreshTokenFirst();

      if (isTokenRefresh) {
        return await POST(url, payload, overrideOptions);
        /* call getHeaders() again to use latest access token */
        //   const result = await request.post(url, {
        //     ...options,
        //     headers: getHeaders(),
        //   });
        //   if (result?.status === 0) {
        //     return result.data;
        //   }
        //   return result || true;
        // }
      }
    }
    throw error;
  }
};

export const PUT = async (
  url: string,
  payload: any,
  overrideOptions: RequestOptionsInit | undefined = {},
): Promise<any> => {
  const options = {
    ...overrideOptions,
    data: { ...payload },
    getResponse: false,
    headers: getHeaders(),
  };
  try {
    const result = await request.put(url, options);
    if (result?.status === 0) {
      return result.data;
    }
    return result || true;
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      const isTokenRefresh = await doRefreshTokenFirst();

      if (isTokenRefresh) {
        return await PUT(url, payload, overrideOptions);
        /* call getHeaders() again to use latest access token */
        //   const result = await request.put(url, {
        //     ...options,
        //     headers: getHeaders(),
        //   });
        //   if (result?.status === 0) {
        //     return result.data;
        //   }
        //   return result || true;
      }
    }
    throw error;
  }
};

export const DELETE = async (
  url: string,
  overrideOptions = {},
): Promise<any> => {
  const options = {
    ...overrideOptions,
    headers: getHeaders(),
    getResponse: false,
  };
  try {
    const result = await request.delete(url, options);
    if (result?.status === 0) {
      return result.data;
    }
    return result || true;
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      const isTokenRefresh = await doRefreshTokenFirst();

      if (isTokenRefresh) {
        return await DELETE(url, overrideOptions);
        /* call getHeaders() again to use latest access token */
        // const result = await request.put(url, {
        //   ...options,
        //   headers: getHeaders(),
        // });
        // if (result?.status === 0) {
        //   return result.data;
        // }
        // return result || true;
      }
    }
    throw error;
  }
};
