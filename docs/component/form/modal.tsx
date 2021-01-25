import React, { useState } from 'react';
import { Input, Select } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import { Form, Button, Modal } from '@medisys/component';
import { useBoolean } from 'ahooks';
import Basic from './basic';
const ModalDemo = () => {
  const [state, { toggle, setTrue, setFalse }] = useBoolean(false);

  return (
    <>
      <Button
        onClick={() => {
          setTrue();
        }}
      >
        Show Modal
      </Button>
      <Modal
        visible={state}
        onCancel={() => {
          setFalse();
        }}
        onOk={() => {
          setFalse();
        }}
      >
        <Basic />
      </Modal>
    </>
  );
};

export default ModalDemo;
