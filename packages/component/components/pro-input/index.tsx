import React from 'react';
import { ProFormText } from '@ant-design/pro-form';

type ComponentProps = React.ComponentProps<typeof ProFormText>;

const ProInput = (props: ComponentProps) => {
  return <ProFormText width="md" {...props} />;
};
ProInput.Password = ProFormText.Password;
export default ProInput;
