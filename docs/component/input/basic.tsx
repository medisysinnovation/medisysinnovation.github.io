import React, { useEffect, useState } from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import { Form, Button, Modal, Select, Input } from '@medisys/component';
import { MIConfig, sleep } from '@medisys/utils';
// console.dir(ConfigProvider);
// console.dir(ConfigProvider.ConfigContext.Consumer);

const InputBasicDemo = () => {
  const myRef = React.useRef();
  console.log(1);
  // console.log(myRef);
  useEffect(() => {
    // myRef.current.focus()
    // console.log(myRef.current.);
  }, []);
  return (
    <>
      <Input ref={myRef} />
    </>
  );
};

export default InputBasicDemo;
