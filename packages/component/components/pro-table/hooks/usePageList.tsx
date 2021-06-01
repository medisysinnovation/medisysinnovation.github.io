import type React from 'react';
import { useContext, useEffect, useState, useCallback } from 'react';
import {PageContext} from '../../context/pageContext';
import { miRequest, getRowKey } from '../utils';
import { MIConfig } from '@medisys/utils';
import {APIInterface} from '../typing'
import type { ProTableProps } from '@ant-design/pro-table';

import type { ActionType } from '@ant-design/pro-table';
const getUseModel=MIConfig.getModelHook
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PageList = <T, U, ValueType>({
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
}: Omit<ProTableProps<T, U, ValueType>, 'request' | 'editable'> & {
  actionRef: React.MutableRefObject<ActionType | undefined>;
  tableRef: React.MutableRefObject<HTMLDivElement | undefined>;
  api: APIInterface<T>;
  onRowDblClick?: (entity: T) => void;
  onEdit?: (entity: T) => void;
  request?: () => Promise<unknown>;
  editable?: boolean;
  rowKey: string;
  model?: string;
}) => {
  const { setValues } = useContext(PageContext);
  const { model: defaultModel } = useContext(PageContext);
  const { api: modelAPI, dispatch, ...restModel } = getUseModel()((model || defaultModel) as any) || {api:{}};

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
    (entity) => (e: Event) => {
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
      if (e.target?.tagName === 'A') return;
      // @ts-ignore
      const tr = e.target?.closest('tr');
      const clickedRowKey = tr?.getAttribute('data-row-key');
      if (clickedRowKey) {
        const entity = currentData?.find((o) => o[rowKey] === clickedRowKey) as T;
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

  return {
    api: api || modelAPI,
    model: {
      ...restModel,
      api: api || modelAPI,
    },
    request:
      request ||
      // @ts-ignore
      miRequest(queryList),
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
  };
};

export default PageList;
