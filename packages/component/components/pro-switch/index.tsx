import React from 'react';
import { ProFormSwitch } from '@ant-design/pro-form';

type ComponentProps = React.ComponentProps<typeof ProFormSwitch>;

const ProSwitch = ({ width, ...props }: ComponentProps) => {
  // return (
  //   <ProForm.Item name="switch" label="Switch" valuePropName="checked" width="md">
  //     <Switch />
  //   </ProForm.Item>
  // );
  return (
    <div className={`pro-field-${width}`}>
      <ProFormSwitch {...props} />
    </div>
  );
};

export default ProSwitch;
