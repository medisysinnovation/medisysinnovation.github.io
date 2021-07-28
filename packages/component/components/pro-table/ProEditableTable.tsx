import React,{ useState, useRef, useMemo } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import Button from '../button';
import { message } from 'antd';
import { getDefaultErrorMessage } from './utils';
import type { ActionRenderConfig, NewLineConfig } from '@ant-design/pro-utils/es/useEditableArray';
import { SaveEditableAction, CancelEdit } from './ActionButton';
import ProTable from './ProTable';
import type { ProColumns } from '@ant-design/pro-table';
import { uniqueid } from '@medisys/utils';

import { PlusOutlined } from '@ant-design/icons';
import type { MIProEditableTableProps,MIRecordType } from './typing';
import { useColumns, useOptionRender, usePageList, useHighlight } from './hooks';
import FooterPanel from './FooterPanel';
import { ConfigProviderWrap,useIntl } from '../locale'
import type { ParamsType } from '@ant-design/pro-provider';

// import { convertMessages } from '@/utils/validation/validUtil';
// import type { FormInstance, FormItemProps } from 'antd/lib/form';

// function replaceMessage(template, kv) {
//   return template.replace(/\$\{\w+\}/g, function (str) {
//     const key = str.slice(2, -1);
//     return kv[key];
//   });
// }



const MIEditableProTable = <T extends MIRecordType, U>({
  editable,
  features = ['batchRemove', 'edit', 'duplicate', 'remove'],
  defaultColumns = ['createdBy', 'updatedBy', 'options'],
  recordCreatorProps,
  behavior={
    reloadOnSave:true
  },
  ...props
}: MIProEditableTableProps<T, U>) => {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  // const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  // const [cols, setCols] = useState<ProColumns<T>[]>([]);
  const tableRef = useRef<HTMLDivElement>();
  const [lastRowId, setLastRowId] = useState();
  const intl = useIntl();
  //@ts-ignore
  const { api, model, rowKey,columns,postData, actionRef,onRow, ...sharedPageProps } = usePageList({
    tableRef,
    editable: true,
    ...props,
  });

  const { remove, create, update } = api!;
  const {params}=props
  useHighlight({
    lastRowId,
    tableRef,
  });
  const optionRender = useOptionRender({
    features,
    rowKey,
    api,
    tableRef,
    //@ts-ignore
    editable,
    //@ts-ignore
    recordCreatorProps,
  });
  const originalColumns = useColumns({
    rowKey,
    api,
    //@ts-ignore
    columns,
    defaultColumns,
    extraColumns: [],
    optionRender,
  });

  const mergedColumns = useMemo(() => {
    // @ts-ignore
    return (originalColumns || []).map((o) => {
      // @ts-ignore
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
        //@ts-ignore
        // @ts-ignore
        recordCreatorProps={{
          // @ts-ignore
          style: {
            display: 'none',
          },
          creatorButtonText:intl.getMessage('table.action.add','Add New Record'),
          ...recordCreatorProps
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
          onSave: async (rowId, row:T, newLine) => {
            if (!create || !update) {
              throw new Error('`create` and `update` api function not passed');
            }
            const newId: any = newLine ? await create(params,row) : await update(params,row);
            message.success(newLine?intl.getMessage('table.message.recordCreated', 'Record created') :intl.getMessage('table.message.recordUpdated', 'Record updated'));
            setLastRowId(newId || rowId);
            // console.log(key);
            actionRef.current?.cancelEditable(rowId);
            if(behavior.reloadOnSave){
              actionRef.current?.reloadAndRest?.();
            }
            editable?.onRowDataChanged?.([row]);

          },
          ...editable,
        }}
        rowSelection={{
          onChange: (_, _selectedRows:T[]) => {
            setSelectedRows(_selectedRows);
          },
        }}
        toolBarRender={() => [
          <ProTable.Editable.RecordCreator
            position="top"
            record={{
              [rowKey]: uniqueid() as unknown,
              //@ts-ignore
              ...recordCreatorProps?.record
            }}
          >
            <Button type="primary">    
              {
              //@ts-ignore
              <PlusOutlined />
              } {intl.getMessage('table.action.new', 'New')}
            </Button>
          </ProTable.Editable.RecordCreator>,
        ]}
        pagination={{
          hideOnSinglePage: true,
          pageSize: 9999,//TODO: allow config
        }}
        {...sharedPageProps}
        {...props}
        onRow={onRow}
        columns={mergedColumns}
        actionRef={actionRef}
        postData={postData}
      />
      {selectedRows?.length > 0 && features.includes('batchRemove') && (
        <FooterPanel
          rowKey={rowKey}
          rows={selectedRows as []}
          onRemove={remove!}
          onSuccess={() => {
            actionRef.current?.reloadAndRest?.();
            editable?.onRowDataChanged?.(selectedRows);
          }}
        />
      )}
    </div>
  );
};


const EditableProviderWrap=<
  T extends MIRecordType,
  U extends ParamsType = ParamsType,
>(
  props: MIProEditableTableProps<T, U>,
) => {
  return (
    <ConfigProviderWrap>
      <MIEditableProTable<T, U> {...props} />
    </ConfigProviderWrap>
  );
};


EditableProviderWrap.RecordCreator = EditableProTable.RecordCreator;

export default EditableProviderWrap;
