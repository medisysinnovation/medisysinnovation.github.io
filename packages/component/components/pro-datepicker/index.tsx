import React from 'react';
import { ProFormDatePicker } from '@ant-design/pro-form';

type ComponentProps = React.ComponentProps<typeof ProFormDatePicker>;
export default (props: ComponentProps) => {
  return <ProFormDatePicker {...props} />;
};
