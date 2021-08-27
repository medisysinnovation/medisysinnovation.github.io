import {
  useEffect,
  useState,
  useCallback,
  useRef,
  useImperativeHandle,
} from 'react';
import { getRowKey, useMIActionType, queryListRequest } from './utils';
import { MIConfig } from '@medisys/utils';
import { SharedListProps, MIActionType } from './typing';
import { PageContext } from '../context';

const getUseModel = MIConfig.getModelHook;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useList = <
  T extends {
    [key: string]: number | string | boolean;
  },
  U
>({
  api,
  request,
  postData,
  rowKey = 'id',
  model,
  dataSource,
  columns,
  actionRef: propsActionRef,
}: Omit<SharedListProps<T, U>, 'editable' | 'rowSelection'>) => {
  const { api: modelAPI, ...restModel } = getUseModel()(model as any) || {
    api: {},
  };

  const { queryList } = api || modelAPI;
  const key = getRowKey(rowKey);
  const [currentData, setCurrentData] = useState<T[]>([]);
  const { actionRef: pageActionRef } = PageContext.useContainer();

  const _actionRef = useRef<MIActionType>();
  useEffect(() => {
    if (typeof propsActionRef === 'function' && pageActionRef?.current) {
      //@ts-ignore
      propsActionRef(actionRef.current);
    }
  }, [propsActionRef]);
  const actionRef = _actionRef || propsActionRef;
  const actions = useMIActionType(
    actionRef,
    {
      dataSource,
      currentData,
    },
    {},
  );
  //@ts-ignore
  useImperativeHandle(propsActionRef || pageActionRef, () => {
    return {
      //@ts-ignore
      ...actionRef.current,
      ...actions,
    };
  });

  // if (propsActionRef) {
  //   // @ts-ignore
  //   propsActionRef.current = actionRef.current;
  // }

  const _request = useCallback(
    queryListRequest<T>({
      request,
      queryHandler: queryList,
      columns,
    }),
    [request, queryList],
  );
  return {
    actionRef,
    api: api || modelAPI,
    model: {
      ...restModel,
      api: api || modelAPI,
    },
    request: _request,
    postData: (data: any[]) => {
      let d = data;
      if (postData) {
        d = postData(d);
      }
      setCurrentData(d);
      return d;
    },
    rowKey: key,
  };
};

export { useList };
