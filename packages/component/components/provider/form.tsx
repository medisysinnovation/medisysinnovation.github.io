import React, { useEffect, useState, ReactNode } from 'react';

import MIFormContext, { MIFormContextPayload } from '../context/formContext';

export interface FormContextOnFormStateChangeProps {
  contextData: MIFormContextPayload;
  onContextDataChange?: (newContextData: MIFormContextPayload) => void;
}
export interface FormProviderProps {
  children: ReactNode;
  onFormStateChange: (props: FormContextOnFormStateChangeProps) => void;
}

const FormProvider: React.FC<FormProviderProps> = ({
  children,
  onFormStateChange,
}) => {
  const [contextData, setContextData] = useState<MIFormContextPayload>({
    discard: false,
  });

  useEffect(() => {
    if (onFormStateChange) {
      onFormStateChange({
        contextData,
        onContextDataChange: (newContextData: MIFormContextPayload) => {
          if (newContextData) {
            setContextData(newContextData);
          }
        },
      });
    }
  }, [contextData?.discard]);

  return (
    <MIFormContext.Provider
      value={{
        payload: contextData,
        setPayload: (v: MIFormContextPayload) => {
          console.log(v);
          if (v.discard !== contextData.discard)
            // if (v.discard && form?.isFieldsTouched()) setContextData(v);
            setContextData(v);
        },
      }}
    >
      {children}
    </MIFormContext.Provider>
  );
};

export default FormProvider;
