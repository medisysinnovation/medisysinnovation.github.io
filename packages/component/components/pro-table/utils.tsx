import React from 'react';
import { ProSchema } from '@ant-design/pro-utils';
import {
  RowKey,
  MIActionType,
  UseMIFetchDataAction,
  MITableColumn,
} from './typing';
import { removeEmpty, convertToAPIObject, MIConfig } from '@medisys/utils';
import { Statistic } from 'antd';
import { valueType } from 'antd/lib/statistic/utils';

type Parameters = { onSuccess: () => void; onError: () => void };
export const miRequest = (
  request: () => Promise<unknown>,
  params: Parameters,
) => {
  if (typeof request !== 'function') return null;
  const { onSuccess, onError } = params || {};
  let result = {
    success: false,
    data: {},
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

export const queryListRequest = ({
  request,
  queryHandler,
  columns,
}: {
  request?: Function;
  queryHandler?: unknown;
  columns?: unknown[];
}) => <T extends Record<string, any>>(
  params: any,
  sort: any,
  filter: any,
): Promise<T> => {
  //TODO: fix sort error when dataIndex is in ['a','id'] format
  const convertedSort = Object.keys(sort || {}).reduce((acc, curr) => {
    return {
      ...acc,
      //@ts-ignore
      [(columns || []).find(o => o.dataIndex === curr)?.sortBy || curr]: sort[
        curr
      ],
    };
  }, {});

  console.log(request, queryHandler);
  return (
    request?.apply(undefined, [params, convertedSort, filter]) ||
    MIConfig.getConfig('requestWrap')?.(queryHandler)?.apply(undefined, [
      params,
      convertedSort,
      filter,
    ]) ||
    // @ts-ignore
    miRequest(queryHandler)?.apply(undefined, [params, convertedSort, filter])
  );
};

export const getDefaultErrorMessage = (
  { required, min, max, len }: any,
  colSchema: ProSchema,
) => {
  if (required) return 'This field is required';
  const { valueType } = colSchema;
  if (
    !valueType ||
    valueType === 'password' ||
    valueType === 'text' ||
    valueType === 'textarea'
  ) {
    if (len !== undefined)
      return `This field must be exactly ${len} characters`;
    if (min !== undefined && max !== undefined)
      return `This field must be between ${min} and ${max} characters`;
    if (min !== undefined)
      return `This field must be at least ${min} characters`;
    if (max !== undefined)
      return `This field cannot be longer than ${min} characters`;
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

export function useMIActionType<T>(
  ref: React.MutableRefObject<MIActionType | undefined>,
  action: UseMIFetchDataAction<T>,
  //@ts-ignore
  props: any,
) {
  if (!ref) return;
  // const {
  //   dataSource,
  //   currentData
  // }=props
  /** 这里生成action的映射，保证 action 总是使用的最新 只需要渲染一次即可 */
  //@ts-ignore
  const userAction: MIActionType = {
    ...ref?.current,
    getRecords: () => action.dataSource || action.currentData || [],
  };
  // const {actionRef, updateState} =  PageContext.useContainer();
  // useEffect(()=>{
  //   if(updateState && actionRef?.current!==userAction){
  //     updateState({
  //       actionRef:{
  //         current:userAction
  //       }
  //     })
  //   }
  // },[userAction])

  // eslint-disable-next-line no-param-reassign
  ref.current = userAction;
  return userAction;
}

const localeMapper: {
  [key: string]: string;
} = {
  en: 'en-US',
};

export const columnConverter = ({ locale }: Record<string, any>) => <
  T,
  ValueType
>(
  col: MITableColumn<T, ValueType>,
) => {
  if (!['money', 'digit', 'date', 'dateTime'].includes(col.valueType as string))
    return col;
  const { valueType, ...o } = col;

  const opts: Record<string, any> = {};

  switch (valueType) {
    case 'date':
      opts.fieldProps = {
        format: 'DD-MMM-YYYY',
      };
      opts.valueType = valueType;
      break;
    case 'dateTime':
      opts.fieldProps = {
        format: 'DD-MMM-YYYY HH:mm:ss',
      };
      opts.valueType = valueType;
      break;
    case 'digit':
      opts.render = (
        _: any,
        entity: { [x: string]: valueType | undefined },
      ) => {
        return (
          <Statistic
            value={entity[col.dataIndex as any]}
            {...col?.fieldProps}
          />
        );
      };
      break;
    default:
      break;
  }

  return {
    //@ts-ignore
    align: ['money', 'digit'].includes(valueType) ? 'right' : o.align,
    ...o,
    valueType: {
      type: valueType,
      ...(typeof valueType === 'object' ? valueType : {}),
      locale: localeMapper[locale],
    },
    ...opts,
  };
};
