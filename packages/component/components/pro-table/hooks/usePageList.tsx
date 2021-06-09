import type React from 'react';
import { useContext, useEffect, useState, useCallback,useRef ,useImperativeHandle} from 'react';
import { miRequest, getRowKey,useMIActionType } from '../utils';
import { MIConfig } from '@medisys/utils';
import {MIProTableProps, APIInterface} from '../typing'
import { ConfigProvider } from '../../provider';
import {MIActionType} from '../typing'
import {PageContext} from '../../context'
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
  dataSource,
  actionRef:propsActionRef,

}: Omit<MIProTableProps<T, U, ValueType>,  'editable'> & {
  actionRef: React.MutableRefObject<MIActionType | undefined>;
  tableRef: React.MutableRefObject<HTMLDivElement | undefined>;
  api: APIInterface<T>;
  onRowDblClick?: (entity: T) => void;
  onEdit?: (entity: T) => void;
  editable?: boolean;
  rowKey: string;
  model?: string;
}) => {
  const { api: modelAPI, dispatch, ...restModel } = getUseModel()((model) as any) || {api:{}};
  const {locale:{locale ='en-US'}={}}={} = useContext(ConfigProvider.ConfigContext)
  const { queryList } = api || modelAPI;
  const key = getRowKey(rowKey);
  const [currentData, setCurrentData] = useState<T[]>([]);
  const { actionRef:pageActionRef } =  PageContext.useContainer();
  const _actionRef = useRef<MIActionType>()
  useEffect(() => {
    if (typeof propsActionRef === 'function' && pageActionRef?.current) {
      //@ts-ignore
      propsActionRef(actionRef.current);
    }
  }, [propsActionRef]);
  const actionRef=_actionRef || propsActionRef
  const actions = useMIActionType(actionRef, {
    dataSource,
    currentData
  }, {

  })
  //@ts-ignore
  useImperativeHandle(pageActionRef, () => {
    return {
      //@ts-ignore
      ...actionRef.current,
      ...actions,
    }
  });

  if (propsActionRef) {
    // @ts-ignore
    propsActionRef.current = actionRef.current;
  }


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
  const _request = useCallback(async ( params:any,sort:any,filter:any)=>{
    //TODO: fix sort error when dataIndex is in ['a','id'] format
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
    actionRef,
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
    columns:(columns || []).map(({valueType,...o})=>{
      if(!valueType) return o
      return {
        //@ts-ignore
        align:['money','digit'].includes(valueType)?'right':o.align,
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
