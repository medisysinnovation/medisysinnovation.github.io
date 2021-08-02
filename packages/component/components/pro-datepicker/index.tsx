import React from 'react';
import { ProFormDatePicker } from '@ant-design/pro-form';
import { useIntl } from '../locale';

type ComponentProps = React.ComponentProps<typeof ProFormDatePicker>;

export default ({ fieldProps, ...props }: ComponentProps) => {
  const intl = useIntl();

  const defaultFieldProps = {
    placeholder: intl.getMessage('form.datepicker', 'Select date'),
  };

  return (
    <ProFormDatePicker
      fieldProps={{
        ...defaultFieldProps,
        ...fieldProps,
      }}
      {...props}
    />
  );
};
