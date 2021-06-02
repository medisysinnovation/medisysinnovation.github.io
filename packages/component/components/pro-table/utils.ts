import type { ProSchema } from '@ant-design/pro-utils';
import type {RowKey} from './typing'
import { removeEmpty, convertToAPIObject } from '@medisys/utils';
type Parameters = { onSuccess: () => void; onError: () => void };
export const miRequest = (request: () => Promise<unknown>, params: Parameters) => {
  if (typeof request !== 'function') return null;
  const { onSuccess, onError } = params || {};
  let result = {
    success: false,
    data: {},
    // "errorCode": "1001",
    // "errorMessage": "error message",
    // "showType": 2,
    // "traceId": "someid",
    // "host": "10.1.1.1"
  };
  return async function innerRequest(...args: any[]) {
    // eslint-disable-next-line no-param-reassign
    args[0] = {
      ...convertToAPIObject(removeEmpty(args[0])),
      sorting:
        args[1] !== undefined && Object.keys(args[1]).length > 0
          ? [
              {
                sortBy: Object.keys(args[1])[0],
                order: Object.values(args[1])[0] === 'ascend' ? 'ASC' : 'DESC',
              },
              // {
              //   sortBy: 'clientId',
              //   order: 'ASC',
              // },
            ]
          : [],
    };

    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    const r = (await request.apply(this, args)) as any;
    result = {
      ...r,
      data: {
        data: (r.data?.data || []).map((o: any) => ({
          key: o.id,
          ...o,
        })),
        ...r.data?.pagination,
      },
      success: !r.detailsErrorMessage,
    };

    return new Promise((resolve, reject) => {
      if (result.success) {
        resolve(result.data);
        if (onSuccess) onSuccess();
      } else {
        reject(result);
        if (onError) onError();
      }
    });
  };
};

export const getDefaultErrorMessage = ({ required, min, max, len }: any, colSchema: ProSchema) => {
  if (required) return 'This field is required';
  const { valueType } = colSchema;
  if (!valueType || valueType === 'password' || valueType === 'text' || valueType === 'textarea') {
    if (len !== undefined) return `This field must be exactly ${len} characters`;
    if (min !== undefined && max !== undefined)
      return `This field must be between ${min} and ${max} characters`;
    if (min !== undefined) return `This field must be at least ${min} characters`;
    if (max !== undefined) return `This field cannot be longer than ${min} characters`;
  } else if (valueType === 'digit') {
    if (len !== undefined) return `This field must equal ${len}`;
    if (min !== undefined && max !== undefined)
      return `This field must be between ${min} and ${max}`;
    if (min !== undefined) return `This field cannot be greater than ${min}`;
    if (max !== undefined) return `This field cannot be less than ${max}`;
  }

  return 'Validation error';
};


export const getRowKey = (rowKey: RowKey) => {
  if (typeof rowKey === 'function' && rowKey) {
    return rowKey();
  }

  return rowKey;
};
