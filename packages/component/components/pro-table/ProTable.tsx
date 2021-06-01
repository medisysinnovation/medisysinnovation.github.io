import React, { useState, useRef } from 'react';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type { ProTableProps } from '@ant-design/pro-table';
import type { ActionType } from '@ant-design/pro-table';
import type { RowEditableConfig, ProCoreActionType, ProSchema } from '@ant-design/pro-utils';
import type { RowKey } from './utils';
import EditableProTable from './ProEditableTable';
import type { ExtraColumn, TableFeature } from './hooks/useColumns';
import { useColumns, useOptionRender, usePageList } from './hooks';
import FooterPanel from './FooterPanel';
import {APIInterface} from './typing'

export type MIProTableProps<T, U, ValueType> = Omit<ProTableProps<T, U, ValueType>, 'request'> & {
  // model name, refer to @/models folder
  model?: string;
  request?: () => Promise<unknown>;
  editable?: RowEditableConfig<T>;
  api?: APIInterface<T>;
  features?: TableFeature<T>[];
  defaultColumns?: ExtraColumn[];
  optionColumnRender?: any[];
  optionColumnEditRender?: (
    dom: React.ReactNode,
    entity: T,
    index: number,
    action: ProCoreActionType,
    schema: ProSchema<T> & {
      isEditable?: boolean;
      type: unknown;
    },
  ) => React.ReactNode;
  onRowDblClick?: (entity: T) => void;
  onEdit?: (entity: T) => void;
  rowKey?: RowKey;
};
const MIProTable = <T, U, ValueType = 'text'>({
  defaultColumns = ['createdBy', 'updatedBy', 'options'],
  optionColumnRender,
  columns = [],
  features = ['batchRemove', 'remove'],
  postData,
  // toolBarRender,
  ...props
}: MIProTableProps<T, U, ValueType>) => {
  // @ts-ignore
  const [selectedRowsState, setSelectedRows] = useState<T[]>([]);
  const actionRef = useRef<ActionType>();
  const tableRef = useRef<HTMLDivElement>();
  const { api, rowKey, defaultEditCallback, ...sharedPageProps } = usePageList({
    actionRef,
    tableRef,
    ...props,
  });

  const { remove } = api;

  const optionRender = useOptionRender({
    features: [
      {
        code: 'edit',
        render: (entity: T) => (
          <a
            key="edit"
            // @ts-ignore
            disabled={entity.isUserMaintainable === false}
            // @ts-ignore
            onClick={defaultEditCallback(entity)}
          >
            Edit
          </a>
        ),
      },
      ...features.filter((o) => o !== 'edit'),
    ],
    rowKey,
    api,
    tableRef,
  });
  const mergedColumns = useColumns({ columns, defaultColumns, optionRender });
  return (
    <div ref={tableRef}>
      <ProTable
        rowKey={rowKey}
        bordered
        size="small"
        search={
          {
            // optionRender: (searchConfig, p, dom) => {
            //   // ?: ((searchConfig: Omit<BaseQueryFilterProps, 'submitter' | 'isForm'>, props: Omit<BaseQueryFilterProps, 'searchConfig'>, dom: React.ReactNode[]) => React.ReactNode[]) | false;
            //   console.log(searchConfig, p, dom);
            //   return dom;
            // },
          }
        }
        // @ts-ignore
        columns={mergedColumns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        // toolBarRender={toolBarRender.map((o) => {
        //   return o;
        // })}
        {...sharedPageProps}
        {...props}
        actionRef={actionRef}
      />
      {selectedRowsState?.length > 0 && features.includes('batchRemove') && (
        <FooterPanel
          rowKey={rowKey}
          rows={selectedRowsState as []}
          onRemove={remove!}
          onSuccess={() => {
            actionRef.current?.reloadAndRest?.();
          }}
        />
      )}

    </div>
  );
};
MIProTable.TableDropdown = TableDropdown;
MIProTable.Editable = EditableProTable;

export default MIProTable;
