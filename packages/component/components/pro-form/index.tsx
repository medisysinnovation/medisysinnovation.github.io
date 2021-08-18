import React from 'react';
import OrgProForm from '@ant-design/pro-form';
import { ProFormProps } from '@ant-design/pro-form/lib/layouts/ProForm';
import { omitUndefined } from '@medisys/utils';

// import type { GroupProps } from '@ant-design/pro-form/lib/interface';
import Form from '../form';

const ProForm = (
  props: ProFormProps & {
    model?: string;
  },
) => {
  const { onFinish, model, initialValues, ...restProps } = props;
  return (
    <OrgProForm
      initialValues={omitUndefined(initialValues!)}
      onFinish={async values => {
        if (onFinish) {
          await onFinish({
            ...initialValues,
            ...values,
          });
        }
      }}
      {...restProps}
    />
  );
};

type GroupComponentProps = React.ComponentProps<typeof OrgProForm.Group>;

const FormGroup = (props: GroupComponentProps) => {
  return <OrgProForm.Group size={16} {...props} />;
};
ProForm.useForm = Form.useForm;
ProForm.Group = FormGroup;
ProForm.Item = Form.Item;

export default ProForm;
