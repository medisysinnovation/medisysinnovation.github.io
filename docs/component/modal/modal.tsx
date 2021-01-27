import React, { useState } from 'react';
import { Input, Select } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import { Form, Button, Modal } from '@medisys/component';
import { useBoolean } from 'ahooks';

setInterval(() => {
  Modal.updateState({
    loading: {
      models: {
        abc: true,
      },
    },
  });
}, 5000);

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
        model="abc"
        onCancel={() => {
          setFalse();
        }}
        onOk={() => {
          setFalse();
        }}
      >
        <div>yeryey</div>
      </Modal>
    </>
  );
};

export default ModalDemo;
