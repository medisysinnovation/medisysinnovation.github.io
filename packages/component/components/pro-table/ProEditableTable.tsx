import { useState, useRef, useMemo } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import { Button } from '@medisys/component';
import { message } from 'antd';
import { getDefaultErrorMessage } from './utils';
import type { ActionRenderConfig, NewLineConfig } from '@ant-design/pro-utils/es/useEditableArray';
import { SaveEditableAction, CancelEdit } from './ActionButton';
import ProTable from './ProTable';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { uniqueid } from '@medisys/utils';

import { PlusOutlined } from '@ant-design/icons';
import type { MIProTableProps } from './ProTable';
import { useColumns, useOptionRender, usePageList, useHighlight } from './hooks';
import FooterPanel from './FooterPanel';

// import { convertMessages } from '@/utils/validation/validUtil';
// import type { FormInstance, FormItemProps } from 'antd/lib/form';

// function replaceMessage(template, kv) {
//   return template.replace(/\$\{\w+\}/g, function (str) {
//     const key = str.slice(2, -1);
//     return kv[key];
//   });
// }

type MIProEditableTableProps<T, U, ValueType> = MIProTableProps<T, U, ValueType>;

const MIEditableProTable = <T, U, ValueType = 'text'>({
  editable,
  features = ['batchRemove', 'edit', 'duplicate', 'remove'],
  defaultColumns = ['createdBy', 'updatedBy', 'options'],
  columns = [],
  optionColumnEditRender,
  ...props
}: MIProEditableTableProps<T, U, ValueType>) => {
  const [selectedRowsState, setSelectedRows] = useState<T[]>([]);
  // const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  // const [cols, setCols] = useState<ProColumns<T>[]>([]);
  const actionRef = useRef<ActionType>();
  const tableRef = useRef<HTMLDivElement>();
  const [lastRowId, setLastRowId] = useState();
  const { api, model, rowKey, ...sharedPageProps } = usePageList({
    actionRef,
    tableRef,
    editable: true,
    ...props,
  });
  const { remove, create, update } = api!;

  useHighlight({
    lastRowId,
    tableRef,
  });
  const optionRender = useOptionRender({
    features,
    rowKey,
    api,
    tableRef,
  });
  const originalColumns = useColumns({
    rowKey,
    api,
    columns,
    defaultColumns,
    extraColumns: [],
    optionRender,
  });

  const mergedColumns = useMemo(() => {
    // @ts-ignore
    return (originalColumns || []).map((o) => {
      if (o.formItemProps?.rules) {
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        o.formItemProps.rules = o.formItemProps.rules.map((r) => {
          return {
            message: getDefaultErrorMessage(r, o),
            ...r,
          };
        });
      }
      return {
        ...o,
        formItemProps: {
          validateTrigger: 'onBlur',
          ...o.formItemProps,
        },
      };
    }) as ProColumns<T>[];
  }, [originalColumns]);

  // @ts-ignore
  return (
    <div ref={tableRef}>
      <EditableProTable
        rowKey={rowKey}
        bordered
        size="small"
        search={{}}
        // style={}
        // @ts-ignore
        columns={mergedColumns}
        // @ts-ignore
        recordCreatorProps={{
          style: {
            display: 'none',
          },
        }}
        form={
          {
            // validateMessages: {
            //   required: "'${label}' is required",
            // },
          }
        }
        editable={{
          // editableKeys,
          // onChange: setEditableRowKeys,
          deletePopconfirmMessage: 'Delete this row?',
          onlyAddOneLineAlertMessage: 'Only one line can be added at the same time',
          onlyOneLineEditorAlertMessage: 'Only one line can be edited',
          // @ts-ignore
          actionRender: (
            row: T,
            config: ActionRenderConfig<T, NewLineConfig<T>>,
            // defaultDoms: {
            //   save: React.ReactNode;
            //   delete: React.ReactNode;
            //   cancel: React.ReactNode;
            // },
          ) => {
            // console.log(config);
            // console.log(row);
            // const { cancel } = defaultDoms;
            // console.log(save, cancel);
            return [
              <SaveEditableAction
                key="save"
                row={row}
                {...config}
                elementProps={{
                  // @ts-ignore
                  disabled: row.isUserMaintainable === false,
                }}
              />,
              <CancelEdit key="cancel" action={actionRef?.current} {...config} />,
            ];
          },
          onSave: async (rowId, row, newLine) => {
            if (!create || !update) {
              throw new Error('`create` and `update` api function not passed');
            }
            const newId: any = newLine ? await create(row) : await update(row);
            message.success(`Record ${newLine ? 'created' : 'updated'}`);
            setLastRowId(newId || rowId);
            // console.log(key);
            actionRef.current?.cancelEditable(rowId);
            actionRef.current?.reloadAndRest?.();
          },
          ...editable,
        }}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        toolBarRender={() => [
          <ProTable.Editable.RecordCreator
            position="top"
            record={{
              [rowKey]: uniqueid() as unknown,
            }}
          >
            <Button type="primary">
              <PlusOutlined /> New
            </Button>
          </ProTable.Editable.RecordCreator>,
        ]}
        pagination={{
          hideOnSinglePage: true,
          pageSize: 9999,//TODO: allow config
        }}
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
MIEditableProTable.RecordCreator = EditableProTable.RecordCreator;
export default MIEditableProTable;
