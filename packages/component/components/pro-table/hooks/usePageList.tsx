import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useImperativeHandle,
  useContext,
} from 'react';
import {
  getRowKey,
  useMIActionType,
  columnConverter,
  queryListRequest,
} from '../utils';
import { ConfigProvider } from '../../provider';
import { MIConfig } from '@medisys/utils';
import { MIProTableProps, APIInterface } from '../typing';
import { MIActionType } from '../typing';
import { PageContext } from '../../context';
import { SyntheticEvent } from 'react';

const getUseModel = MIConfig.getModelHook;
type RowSelectionType = MIProTableProps<any, any, any>['rowSelection'] & {
  // selectOnClick: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PageList = <
  T extends {
    [key: string]: number | string | boolean;
  },
  U,
  ValueType
>({
  // tableRef,
  api,
  onRow,
  onEdit,
  request,
  postData,
  rowKey = 'id',
  editable,
  model,
  columns,
  dataSource,
  actionRef: propsActionRef,
}: Omit<MIProTableProps<T, U, ValueType>, 'editable' | 'rowSelection'> & {
  actionRef: React.MutableRefObject<MIActionType | undefined>;
  tableRef: React.MutableRefObject<HTMLDivElement | undefined>;
  api: APIInterface<T>;
  onEdit?: (entity: T) => void;
  editable?: boolean;
  rowKey: string;
  model?: string;
  rowSelection?: RowSelectionType | false;
}) => {
  const { api: modelAPI, dispatch, ...restModel } = getUseModel()(
    model as any,
  ) || { api: {} };
  //@ts-ignore
  const { locale: { locale = 'en-US' } = {} } = ({} = useContext(
    ConfigProvider.ConfigContext,
  ));
  const { queryList } = api || modelAPI;
  const key = getRowKey(rowKey);
  const [currentData, setCurrentData] = useState<T[]>([]);
  const { actionRef: pageActionRef } = PageContext.useContainer();
  // const [selectedRowKeys, setSelectedRowKeys] = useState<typeof rowKey[]>([]);

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
  useImperativeHandle(pageActionRef, () => {
    return {
      //@ts-ignore
      ...actionRef.current,
      ...actions,
    };
  });

  if (propsActionRef) {
    // @ts-ignore
    propsActionRef.current = actionRef.current;
  }

  const defaultEditCallback = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    entity => (_e: SyntheticEvent) => {
      if (dispatch)
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

  const _request = useCallback(
    queryListRequest({
      request,
      queryHandler: queryList,
    }),
    [request, queryList],
  );
  console.log(queryList);
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
    defaultEditCallback,
    onRow: (record: T, rowIndex: number) => {
      const _onRow = onRow ? onRow(record, rowIndex) : {};
      return {
        onClick: (event: SyntheticEvent) => {
          if (_onRow?.onClick) {
            _onRow?.onClick(event);
          }
        }, // click row
        onDoubleClick: (event: SyntheticEvent) => {
          if (_onRow?.onDoubleClick) {
            _onRow?.onDoubleClick(event);
          } else if (onEdit) {
            onEdit(record);
          } else if (!editable && defaultEditCallback) {
            defaultEditCallback(record)(event);
          } else if (editable) {
            //@ts-ignore
            actionRef.current?.setEditableRowKeys([record[rowKey]]); //.startEditable(clickedRowKey);
          }
        }, // double click row
        onContextMenu: (event: SyntheticEvent) => {
          if (_onRow?.onContextMenu) {
            _onRow?.onContextMenu(event);
          }
        }, // right button click row
        onMouseEnter: (event: SyntheticEvent) => {
          if (_onRow?.onMouseEnter) {
            _onRow?.onMouseEnter(event);
          }
        }, // mouse enter row
        onMouseLeave: (event: SyntheticEvent) => {
          if (_onRow?.onMouseEnter) {
            _onRow?.onMouseEnter(event);
          }
        }, // mouse leave row
      };
    },
    columns: (columns || []).map(columnConverter({ locale })),
  };
};

export default PageList;
