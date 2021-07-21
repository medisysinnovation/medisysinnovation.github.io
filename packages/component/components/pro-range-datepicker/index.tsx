import React from 'react';
import { ProFormDateRangePicker } from '@ant-design/pro-form';
import { useIntl } from '../locale';

type ComponentProps = React.ComponentProps<typeof ProFormDateRangePicker>;
export default ({ fieldProps, ...props }: ComponentProps) => {
  const intl = useIntl();

  const defaultFieldProps = {
    placeholder: [
      intl.getMessage('form.rangedatepicker', 'Please select'),
      intl.getMessage('form.rangedatepicker', 'Please select'),
    ] as [string, string],
  };

  return (
    <ProFormDateRangePicker
      fieldProps={{
        ...defaultFieldProps,
        ...fieldProps,
      }}
      {...props}
    />
  );
};
