import React from 'react';
import { ProFormRadio } from '@ant-design/pro-form';

type ComponentProps = React.ComponentProps<typeof ProFormRadio>;

const ProRadio = (props: ComponentProps) => {
  return <ProFormRadio width="xs" {...props} />;
};

ProRadio.Group = ProFormRadio.Group;

export default ProRadio;
