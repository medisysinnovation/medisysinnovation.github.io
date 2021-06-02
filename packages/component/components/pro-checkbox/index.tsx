import React from 'react';
import { ProFormCheckbox } from '@ant-design/pro-form';

type ComponentProps = React.ComponentProps<typeof ProFormCheckbox>;

const ProCheckbox = (props: ComponentProps) => {
  return <ProFormCheckbox width="xs" {...props} />;
};

ProCheckbox.Group = ProFormCheckbox.Group;

export default ProCheckbox;
