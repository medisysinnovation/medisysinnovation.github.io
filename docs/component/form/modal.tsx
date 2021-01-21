import React, { useState } from 'react';
import { Input, Select } from 'antd';
import { Form, Button, Modal } from '@medisys/component';
import { useBoolean } from 'ahooks';
import Basic from './basic';
// console.log(Button);
const { Option } = Select;

const defaultFormConfig = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
  initialValues: {
    note: '',
  },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ModalDemo = () => {
  const [state, { toggle, setTrue, setFalse }] = useBoolean(false);
  console.log('state', state);
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
        triggerUnsavedChangesWarning
      >
        <Basic />
      </Modal>
    </>
  );
};

export default ModalDemo;
