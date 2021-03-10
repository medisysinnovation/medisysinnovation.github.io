import React, { useEffect, useState } from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  Form,
  Button,
  Modal,
  Select,
  Input,
  RefInputProps,
} from '@medisys/component';
import { MIConfig, sleep } from '@medisys/utils';
// console.dir(ConfigProvider);
// console.dir(ConfigProvider.ConfigContext.Consumer);

const InputBasicDemo = () => {
  const myRef = React.useRef<RefInputProps>();
  // console.log(1);
  // console.log(myRef);
  useEffect(() => {
    if (myRef.current) console.log(myRef.current);
    // myRef.current.focus()
    // console.log(myRef.current.);
  }, []);
  return (
    <>
      <Input />
    </>
  );
};

export default InputBasicDemo;
