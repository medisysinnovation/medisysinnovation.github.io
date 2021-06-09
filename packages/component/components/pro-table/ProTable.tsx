import React, { useState, useRef, useMemo } from 'react';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import EditableProTable from './ProEditableTable';
import { useColumns, useOptionRender, usePageList } from './hooks';
import FooterPanel from './FooterPanel';
import { MIProTableProps } from './typing';
// import PageContextWrap from './PageContextWrap';
const MyProTable = ProTable as any;

const MIProTable = <T, U, ValueType = 'text'>({
  defaultColumns = ['createdBy', 'updatedBy', 'options'],
  optionColumnRender,
  features,
  postData,
  editable,
  // toolBarRender,
  ...props
}: MIProTableProps<T, U, ValueType>) => {
  // @ts-ignore
  const [selectedRowsState, setSelectedRows] = useState<T[]>([]);
  const tableRef = useRef<HTMLDivElement>();
  //@ts-ignore
  const {
    api,
    model,
    rowKey,
    columns,
    defaultEditCallback,
    postData: convertPostData,
    actionRef,
    ...sharedPageProps
    //@ts-ignore
  } = usePageList({ tableRef, editable: true, ...props });

  const _defaultFeatures = useMemo(() => {
    return [
      'batchRemove',
      {
        code: 'edit',
        render: (entity: any) => (
          <a
            key="edit"
            // @ts-ignore
            disabled={entity.isUserMaintainable === false}
            // @ts-ignore
            onClick={defaultEditCallback!(entity)}
          >
            Edit
          </a>
        ),
      },
      'remove',
    ];
  }, []);

  const { remove } = api;

  const optionRender = useOptionRender({
    features: features || _defaultFeatures,
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
        //@ts-ignore
        rowSelection={{
          onChange: (_: any, selectedRows: any) => {
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
        columns={mergedColumns}
        postData={convertPostData}
      />
      {selectedRowsState?.length > 0 && features?.includes('batchRemove') && (
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
