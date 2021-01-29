import React from 'react';
import { PromptProps } from 'react-router-dom';
import { FormInstance, FormProps } from 'antd/lib/Form';
export interface MIFormProps<Values = any> extends FormProps<Values> {
  discardCheck?: boolean;
  onDirtyCheck?: PromptProps['message'];
}
declare const MIForm: <Values = any>(
  props: MIFormProps<Values> & {
    children?: React.ReactNode;
  } & {
    ref?:
      | ((instance: FormInstance<Values> | null) => void)
      | React.RefObject<FormInstance<Values>>
      | null
      | undefined;
  },
) => React.ReactElement;
export default MIForm;
