import React from 'react';
import { ProFormText } from '@ant-design/pro-form';
import { useIntl } from '../locale';

type ComponentProps = React.ComponentProps<typeof ProFormText>;

const ProInput = (props: ComponentProps) => {
  const intl = useIntl();
  return (
    <ProFormText
      width="md"
      placeholder={intl.getMessage('form.input', 'Please input')}
      {...props}
    />
  );
};
ProInput.Password = ProFormText.Password;
export default ProInput;
