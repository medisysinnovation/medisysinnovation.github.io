import React, { useState, useRef, useMemo } from 'react';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import EditableProTable from './ProEditableTable';
import { useColumns, useOptionRender, usePageList } from './hooks';
import FooterPanel from './FooterPanel';
import { MIProTableProps,MIRecordType } from './typing';
import type { ParamsType } from '@ant-design/pro-provider';
import { useIntl ,ConfigProviderWrap} from '../locale';

// import PageContextWrap from './PageContextWrap';
const MyProTable = ProTable as any;

const MIProTable = <T extends MIRecordType, U, ValueType = 'text'>({
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
  const intl = useIntl();

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
  } = usePageList({ tableRef, editable: false, ...props });

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
           {intl.getMessage('table.action.edit', 'Edit')}
          </a>
        ),
      },
      'remove',
    ];
  }, []);

  const { remove } = api;

  const optionRender = useOptionRender({
    features: features
      ? (features || []).map(o => {
          return o === 'edit'
            ? _defaultFeatures.find((o: any) => o?.code === 'edit')
            : o;
        })
      : _defaultFeatures,
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

const ProviderWarp = <
  T extends Record<string, any>,
  U extends ParamsType = ParamsType,
  ValueType = 'text'
>(
  props: MIProTableProps<T, U, ValueType>,
) => {
  return (
    <ConfigProviderWrap>
      <MIProTable<T, U, ValueType> {...props} />
    </ConfigProviderWrap>
  );
};

ProviderWarp.TableDropdown = TableDropdown;
ProviderWarp.Editable =EditableProTable

export default ProviderWarp;
