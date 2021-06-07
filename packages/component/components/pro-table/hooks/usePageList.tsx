import type React from 'react';
import { useContext, useEffect, useState, useCallback } from 'react';
import {PageContext} from '../../context/pageContext';
import { miRequest, getRowKey } from '../utils';
import { MIConfig } from '@medisys/utils';
import {MIProTableProps, APIInterface} from '../typing'
import { ConfigProvider } from '../../provider';

import type { ActionType } from '@ant-design/pro-table';

const localeMapper :{
  [key: string]: string,
 }={
  en:'en-US'
}
const getUseModel=MIConfig.getModelHook
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PageList = <T extends {
  [key: string]: number | string | boolean,
 }, U, ValueType>({
  actionRef,
  tableRef,
  api,
  onRowDblClick,
  onEdit,
  request,
  postData,
  rowKey = 'id',
  editable,
  model,
  columns,
}: Omit<MIProTableProps<T, U, ValueType>,  'editable'> & {
  actionRef: React.MutableRefObject<ActionType | undefined>;
  tableRef: React.MutableRefObject<HTMLDivElement | undefined>;
  api: APIInterface<T>;
  onRowDblClick?: (entity: T) => void;
  onEdit?: (entity: T) => void;
  editable?: boolean;
  rowKey: string;
  model?: string;
}) => {
  const { setValues } = useContext(PageContext);
  const { model: defaultModel } = useContext(PageContext);
  const { api: modelAPI, dispatch, ...restModel } = getUseModel()((model || defaultModel) as any) || {api:{}};
  const {locale:{locale ='en-US'}={}}={} = useContext(ConfigProvider.ConfigContext)
  const { queryList } = api || modelAPI;
  const key = getRowKey(rowKey);
  useEffect(() => {
    if (setValues)
      setValues({
        actionRef,
      });
  }, [actionRef, setValues]);

  const [currentData, setCurrentData] = useState<T[]>([]);

  const defaultEditCallback = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (entity) => (_e: Event) => {
      if(dispatch)
      dispatch({
        type: 'updateState',
        payload: {
          showDetail: true,
          currentId: entity[rowKey as any],
        },
      });
    },
    [dispatch, rowKey],
  );

  useEffect(() => {
    const rowDblClick = (e: MouseEvent) => {
      // @ts-ignore
      if (e.target?.tagName === 'A') return;
      // @ts-ignore
      const tr = e.target?.closest('tr');
      const clickedRowKey = tr?.getAttribute('data-row-key');
      if (clickedRowKey) {
        const entity = currentData?.find((o) => `${o[rowKey]}` === clickedRowKey) as T;
        if (onRowDblClick) {
          onRowDblClick(entity);
        } else if (!editable && defaultEditCallback) {
          defaultEditCallback(entity)(e);
        } else if (editable) {
          actionRef.current?.startEditable(clickedRowKey);
        }
      }
    };
    const div = tableRef.current;
    div?.addEventListener('dblclick', rowDblClick);
    return () => {
      div?.removeEventListener('dblclick', rowDblClick);
    };
  }, [
    currentData,
    rowKey,
    onRowDblClick,
    defaultEditCallback,
    onEdit,
    actionRef,
    tableRef,
    editable,
  ]);
console.log((columns || []).map(({valueType='text', ...o})=>{
  return {
    ...o,
    valueType:{
      type:valueType,
      ...(typeof valueType ==='object'? valueType:{}),
      locale:locale
    }
  }
}))
  const _request = useCallback(async ( params:any,sort:any,filter:any)=>{
    const convertedSort = Object.keys((sort || {})).reduce((acc,curr)=>{
      return {
        ...acc,
        //@ts-ignore
        [(columns || []).find(o=>o.dataIndex===curr)?.sortBy || curr]:sort[curr]
      }
    },{})
    return request?.apply(undefined,[params,convertedSort,filter]) ||
      MIConfig.getConfig('requestWrap')?.(queryList)?.apply(undefined,[params,convertedSort,filter]) ||
      // @ts-ignore
      miRequest(queryList)?.apply(undefined,[params,convertedSort,filter])
  },[request,miRequest, queryList,MIConfig.getConfig('requestWrap')?.(queryList)])

  return {
    api: api || modelAPI,
    model: {
      ...restModel,
      api: api || modelAPI,
    },
    request:_request,
    postData: (data: any[]) => {
      let d = data;
      if (postData) {
        d = postData(d);
      }
      setCurrentData(d);
      return d;
    },
    rowKey: key,
    defaultEditCallback,
    columns:(columns || []).map(({valueType='text', ...o})=>{
      return {
        ...o,
        valueType:{
          type:valueType,
          ...(typeof valueType ==='object'? valueType:{}),
          locale:localeMapper[locale]
        }
      }
    })
  };
};

export default PageList;
