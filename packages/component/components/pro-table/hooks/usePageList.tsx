import { useCallback, useContext } from 'react';
import { columnConverter } from '../utils';
import { ConfigProvider } from '../../provider';
import { MIProTableProps } from '../typing';
import { useList } from '../../hook/index';
import { SyntheticEvent } from 'react';

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
  onRow,
  onEdit,
  rowKey = 'id',
  editable,
  columns,
  ...props
}: Omit<MIProTableProps<T, U, ValueType>, 'editable' | 'rowSelection'> & {
  onEdit?: (entity: T) => void;
  editable?: boolean;
  rowSelection?: RowSelectionType | false;
}) => {
  //@ts-ignore
  const { locale: { locale = 'en-US' } = {} } = ({} = useContext(
    ConfigProvider.ConfigContext,
  ));

  const sharedListProps = useList(props);

  const dispatch = sharedListProps?.model?.dispatch;
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

  return {
    ...sharedListProps,
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
            sharedListProps.actionRef?.current?.setEditableRowKeys([
              //@ts-ignore
              record[rowKey],
            ]); //.startEditable(clickedRowKey);
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
