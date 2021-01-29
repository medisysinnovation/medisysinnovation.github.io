import React, { ReactNode } from 'react';
import { MIFormContextPayload } from '../context/formContext';
export interface FormContextOnFormStateChangeProps {
  contextData: MIFormContextPayload;
  onContextDataChange?: (newContextData: MIFormContextPayload) => void;
}
export interface FormProviderProps {
  children: ReactNode;
  onFormStateChange: (props: FormContextOnFormStateChangeProps) => void;
}
declare const FormProvider: React.FC<FormProviderProps>;
export default FormProvider;
