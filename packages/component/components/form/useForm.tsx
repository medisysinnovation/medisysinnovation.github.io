import * as React from 'react';
import { Form } from 'antd';
import { FormInstance } from 'antd/es/form';

const useForm = Form.useForm;

export interface MIFormInstance<Values = any> extends FormInstance<Values> {
  medisys: (name: string) => string;
  submit: () => void;
}

export default function useMIForm<Values = any>(
  form?: FormInstance<Values>,
): [FormInstance<Values>] {
  const [rcForm] = useForm();
  // const itemsRef = React.useRef<Record<string, React.ReactElement>>({});
  const wrapForm: FormInstance<Values> = React.useMemo(
    () =>
      form || {
        ...rcForm,
        // submit: () => {
        //   console.log(123123);
        //   rcForm.submit();
        //   rcForm.resetFields();
        //   //@ts-ignore
        //   const hooks = rcForm.getInternalHooks('RC_FORM_INTERNAL_HOOKS');
        //   console.log(hooks);
        //   const { setInitialValues } = hooks;
        //   console.log(rcForm.getFieldsValue());
        //   setInitialValues(rcForm.getFieldsValue());
        //   console.log(rcForm.isFieldsTouched());
        // },
        medisys: (name: string) => {
          console.log(name);
          return 'abv';
        },
      },
    [form, rcForm],
  );

  return [wrapForm];
}
