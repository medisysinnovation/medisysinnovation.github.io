import React from 'react';
import { FooterToolbar } from '@ant-design/pro-layout';
import { DeleteWrapper } from './ActionButton';
import Button from '../button';

export default ({
  onRemove,
  rows,
  onSuccess,
  rowKey,
}: {
  onRemove: (keys: string[]) => Promise<unknown>;
  rows: [];
  onSuccess: () => void;
  rowKey: string;
}) => {
  return (
    <FooterToolbar
      extra={
        <div>
          Select <a style={{ fontWeight: 600 }}>{rows.length}</a> item
          {rows.length > 1 ? 's' : ''}
          {/* <span>{actionRef?.current?.pageInfo?.total}</span> */}
        </div>
      }
    >
      <DeleteWrapper
        rowKey={rowKey}
        onRemove={onRemove}
        rows={rows}
        onComplete={success => {
          if (success && onSuccess) onSuccess();
        }}
      >
        <Button danger key="delete">
          Batch Delete
        </Button>
      </DeleteWrapper>
    </FooterToolbar>
  );
};
