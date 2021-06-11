import React, { useState, useEffect } from 'react';
import { PageContext, ConfigProvider } from '@medisys/component';
import enUS from 'antd/es/locale/zh_CN';
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
      <PageContext.Provider>{children}</PageContext.Provider>
    </ConfigProvider>
  );
};

export default MIPageContainer;
