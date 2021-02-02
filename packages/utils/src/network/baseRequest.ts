/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
// import { notification } from "antd";
import APIResponse from './APIResponse';
import Qs from 'qs';
import { UnauthorizedError } from './exception';

const codeMessage = {
  200: 'Success',
  201: 'Insert/Update Successfully',
  204: 'Delete Successfully',
  400: 'Some error occurs. Transaction had rolled back.',
  401: 'Unauthorized Access',
  403: 'Access Denied',
  404: 'End point not found',
  500: 'Error occurs in server. Please contact administrator.',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: {
  response: Response;
  data: APIResponse | undefined;
  request?: any;
}): Response => {
  let errorMessage = '';

  const { response, data } = error;

  if (response && response.status === 401) {
    // retry
    throw new UnauthorizedError('UnauthorizedError', error.request);
  }

  if (!response) {
    errorMessage =
      'Could not connect to server. Please check your network connectivity';
  } else if (data) {
    const { message: returnedMessage } = data;
    errorMessage = returnedMessage;
  } else if (response.status) {
    // @ts-ignore
    const errorText = codeMessage[response.status] || response.statusText;
    const { status } = response;
    errorMessage = `${status}: ${errorText}`;
  }
  throw Error(errorMessage);
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  timeout: 60 * 1000,
  prefix: process.env.url,
  errorHandler, // default error handler
  credentials: 'include', // default include cookie
  paramsSerializer: (params: object) => {
    return Qs.stringify(params, { allowDots: true });
  },
});

export default request;
