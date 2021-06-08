import React, { useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { PageContext } from '@medisys/component';
import enUS from 'antd/es/locale/en_US';

const MIPageContainer = ({
  children,
  ...props
}: {
  children?: React.ReactNode;
}) => {
  const [values, setValues] = useState({
    actionRef: undefined,
    setValues: (newValues: any) => {
      setValues({
        ...values,
        ...newValues,
      });
    },
  });

  return (
    <ConfigProvider componentSize="middle" locale={enUS}>
      <PageContext.Provider value={values}>{children}</PageContext.Provider>
    </ConfigProvider>
  );
};

export default MIPageContainer;
