import React from 'react';
import {
  RowKey,
  MIActionType,
  UseMIFetchDataAction,
  MIQueryListType,
} from './typing';
import { omitUndefined, convertToAPIObject, MIConfig } from '@medisys/utils';
import { SortOrder } from 'antd/lib/table/interface';

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
    // console.log(
    //   args,
    //   args[0],
    //   args[1] !== undefined,
    //   Object.keys(args[1]).length > 0,
    // );
    // eslint-disable-next-line no-param-reassign
    args[0] = {
      ...convertToAPIObject(omitUndefined(args[0])),
      sorting:
        args[1] !== undefined && Object.keys(args[1]).length > 0
          ? [
              {
                sortBy: Object.keys(args[1])[0],
                order: Object.values(args[1])[0] === 'ascend' ? 'ASC' : 'DESC',
              },
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

export const queryListRequest = <U extends Record<string, any>>({
  request,
  queryHandler,
  columns,
}: {
  request?: Function;
  queryHandler?: unknown;
  columns?: unknown[];
}) => (
  params: U,
  options: Record<string, SortOrder>,
  filter: Record<string, React.ReactText[] | null>,
): MIQueryListType<U> | undefined => {
  // console.log(params, options, filter);
  //TODO: fix sort error when dataIndex is in ['a','id'] format
  const convertedSort = Object.keys(options || {}).reduce((acc, curr) => {
    return {
      ...acc,
      //@ts-ignore
      [(columns || []).find(o => o.dataIndex === curr)?.sortBy ||
      curr]: options[curr],
    };
  }, {});

  const fn = request || queryHandler;
  if (!fn) return undefined;

  return (MIConfig.getConfig('requestWrap') || miRequest)(fn).apply(undefined, [
    params,
    convertedSort,
    filter,
  ]);
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
