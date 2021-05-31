import type { ActionRenderConfig } from '@ant-design/pro-utils/es/useEditableArray';
import { useMountMergeState } from './hooks';
import { LoadingOutlined } from '@ant-design/icons';
import set from 'rc-util/lib/utils/set';
import { Popconfirm } from '../popconfirm';
import type { ActionType } from '@ant-design/pro-table';

import { message } from 'antd';

export const SaveEditableAction: React.FC<
  ActionRenderConfig<any> & { row: any; elementProps?: any }
> = ({ recordKey, onSave, form, row, children, newLineConfig, editorType, elementProps }) => {
  const [loading, setLoading] = useMountMergeState<boolean>(false);
  return (
    <a
      key="save"
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();
        try {
          const isMapEditor = editorType === 'Map';
          const namePath = Array.isArray(recordKey) ? recordKey : [recordKey];
          setLoading(true);
          // console.log(namePath);
          // @ts-expect-error
          await form.validateFields(namePath, {
            recursive: true,
          });

          const fields = form.getFieldValue(namePath);
          const record = isMapEditor ? set(row, namePath, fields) : { ...row, ...fields };

          const res = await onSave?.(recordKey, record, newLineConfig);
          // setTimeout(() => {
          //   cancelEditable(recordKey);
          // }, 1);
          setLoading(false);
          return res;
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err);
          setLoading(false);
          return null;
        }
      }}
      {...elementProps}
    >
      {loading ? (
        <LoadingOutlined
          style={{
            marginRight: 8,
          }}
        />
      ) : null}
      {children || 'Save'}
    </a>
  );
};

export const CancelEdit: React.FC<
  ActionRenderConfig<any> & { action: ActionType | undefined; elementProps?: any }
> = ({ recordKey, onCancel, form, cancelEditable, cancelText, newLineConfig, action }) => {
  // console.log(recordKey, onCancel, form, row, elementProps, cancelEditable, cancelText);
  return (
    <a
      key="cancel"
      onClick={async () => {
        const namePath = Array.isArray(recordKey) ? recordKey : [recordKey];
        const fields = form.getFieldValue(namePath);
        const res = await onCancel?.(recordKey, fields, newLineConfig);
        // cancelEditable(recordKey);
        cancelEditable(recordKey);
        action?.cancelEditable(recordKey);
        return res;
      }}
    >
      {cancelText || 'Cancel'}
    </a>
  );
};

export const DeleteEditableAction: React.FC<ActionRenderConfig<any> & { row: any }> = ({
  recordKey,
  onDelete,
  row,
  children,
  deletePopconfirmMessage,
  cancelEditable,
}) => {
  const [loading, setLoading] = useMountMergeState<boolean>(false);
  const onConfirm = async () => {
    try {
      setLoading(true);
      const res = await onDelete?.(recordKey, row);
      setLoading(false);
      setTimeout(() => {
        cancelEditable(recordKey);
      }, 0);
      return res;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      setLoading(false);
      return null;
    }
  };
  return children !== false ? (
    <Popconfirm key="delete" title={deletePopconfirmMessage} onConfirm={onConfirm}>
      <a>
        {loading ? (
          <LoadingOutlined
            style={{
              marginRight: 8,
            }}
          />
        ) : null}
        {children || 'Delete'}
      </a>
    </Popconfirm>
  ) : null;
};

export const DeleteWrapper = <T,>({
  children,
  rows = [],
  onComplete,
  onRemove,
  rowKey,
}: {
  children: React.ReactNode;
  rows: T[];
  rowKey: string;
  onComplete?: (success: boolean) => void;
  onRemove: (keys: string[]) => Promise<unknown>;
}) => {
  const handleRemove = async () => {
    const hide = message.loading('Deleting');
    // @ts-ignore
    if (rows.length === 0 || !onRemove) return true;
    let success = false;
    try {
      // @ts-ignore
      const result = (await onRemove(rows.map((r) => r[rowKey]))) as number;
      hide();
      if (result > 0) {
        if (result === rows.length) {
          message.success(
            `Delete ${result} ${result > 1 ? `of ${rows.length}` : ''} record${
              result > 1 ? 's' : ''
            } success, data will be reloaded`,
          );
        } else {
          message.warning(
            `Delete ${result} ${result > 1 ? `of ${rows.length}` : ''} record${
              result > 1 ? 's' : ''
            } success, ${rows.length - result} record delete fail, data will be reloaded`,
          );
        }
      } else {
        message.info('No record deleted, data will be reloaded');
      }
      success = true;
    } catch (error) {
      // console.log(error);
      hide();
      message.error('Delete fail，please retry');
      success = false;
    } finally {
      if (onComplete) onComplete(success);
    }
    return success;
  };

  return (
    <Popconfirm
      onConfirm={async () => {
        await handleRemove();
        // actionRef.current?.reloadAndRest?.();
      }}
    >
      {children}
    </Popconfirm>
  );
};
