import React from 'react';
import { ProFormDateRangePicker } from '@ant-design/pro-form';

type ComponentProps = React.ComponentProps<typeof ProFormDateRangePicker>;
export default (props: ComponentProps) => {
  return <ProFormDateRangePicker {...props} />;
};
