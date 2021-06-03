
import React, { useState, useRef } from 'react';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type { ActionType } from '@ant-design/pro-table';
import EditableProTable from './ProEditableTable';
import { useColumns, useOptionRender, usePageList } from './hooks';
import FooterPanel from './FooterPanel';
import {MIProTableProps} from './typing'



const MyProTable = ProTable as any

const MIProTable = <T, U, ValueType = 'text'>({
  defaultColumns = ['createdBy', 'updatedBy', 'options'],
  optionColumnRender,
  columns = [],
  features = ['batchRemove', 'remove'],
  postData,
  editable,
  // toolBarRender,
  ...props
}: MIProTableProps<T, U, ValueType>) => {
  // @ts-ignore
  const [selectedRowsState, setSelectedRows] = useState<T[]>([]);
  const actionRef = useRef<ActionType>();
  const tableRef = useRef<HTMLDivElement>();
  const { api, rowKey, defaultEditCallback, ...sharedPageProps } = usePageList({
    //@ts-ignore
    actionRef,
    tableRef,
    //@ts-ignore
    column,
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
    //@ts-ignore
    editable,
  });
    //@ts-ignore
  const mergedColumns = useColumns({ columns, defaultColumns, optionRender });
  return (
    <div ref={tableRef}>
      <MyProTable
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
        columns={mergedColumns}
        rowSelection={{
          onChange: (_:any, selectedRows:any) => {
            setSelectedRows(selectedRows);
          },
        }}
        editable={editable}
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
