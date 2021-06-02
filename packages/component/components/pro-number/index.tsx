import React from 'react';
import { ProFormDigit } from '@ant-design/pro-form';

type ComponentProps = React.ComponentProps<typeof ProFormDigit>;

export default (props: ComponentProps) => {
  return (
    <ProFormDigit
      max={100000}
      width="md"
      fieldProps={{ precision: 2, ...props.fieldProps }}
      {...props}
    />
  );
};
