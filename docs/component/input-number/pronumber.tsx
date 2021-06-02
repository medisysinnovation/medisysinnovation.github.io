import React, { useEffect, useState } from 'react';
import en_US from 'antd/es/locale/en_US';

import { ProNumber, ConfigProvider } from '@medisys/component';

const ProInputNumberDemo = () => {
  useEffect(() => {}, []);
  return (
    <ConfigProvider locale={en_US}>
      <ProNumber />
    </ConfigProvider>
  );
};

export default ProInputNumberDemo;
