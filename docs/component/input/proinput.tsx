import React, { useEffect, useState } from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import en_US from 'antd/es/locale/en_US';

import {
  Form,
  Button,
  Modal,
  Select,
  Input,
  ProInput,
} from '@medisys/component';
import { MIConfig, sleep } from '@medisys/utils';
// console.dir(ConfigProvider);
// console.dir(ConfigProvider.ConfigContext.Consumer);

const ProInputDemo = () => {
  // console.log(1);
  // console.log(myRef);
  useEffect(() => {}, []);
  return (
    <>
      <ConfigProvider locale={en_US}>
        <ProInput />
      </ConfigProvider>
    </>
  );
};

export default ProInputDemo;
