import React, { useEffect, useState } from 'react';
import { Input, Select, ConfigProvider } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import { Form, Button, Modal } from '@medisys/component';
import { global } from '@medisys/utils';
import { useBoolean } from 'ahooks';
let testLoadingState = false;
// console.dir(ConfigProvider);
// console.dir(ConfigProvider.ConfigContext.Consumer);

const ModalDemo = () => {
  const [state, { toggle, setTrue, setFalse }] = useBoolean(false);
  const [
    state2,
    { toggle: toggle2, setTrue: setTrue2, setFalse: setFalse2 },
  ] = useBoolean(false);

  // useEffect(() => {
  //   setInterval(() => {
  //     toggle2();
  //   }, 3000);
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      testLoadingState = !testLoadingState;
      global.updateState({
        loading: {
          models: {
            somename: testLoadingState,
          },
        },
      });
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const { getPrefixCls, autoInsertSpaceInButton, direction } = React.useContext(
    ConfigProvider.ConfigContext,
  );
  // console.log(
  //   getPrefixCls(),
  //   getPrefixCls('affix', '123'),
  //   getPrefixCls,
  //   autoInsertSpaceInButton,
  //   direction,
  // );
  // Modal.warning
  console.log(global);
  return (
    <>
      <Button
        onClick={() => {
          setTrue();
        }}
      >
        Show Modal
      </Button>
      <ConfigProvider.ConfigContext.Consumer>
        {context => {
          const { getPrefixCls } = context;
          console.log(context, getPrefixCls(), getPrefixCls('affix', '123'));
          return <div>tet</div>;
        }}
      </ConfigProvider.ConfigContext.Consumer>
      <Modal
        visible={state}
        model="somename"
        onCancel={() => {
          setFalse();
        }}
        onOk={() => {
          setFalse();
        }}
      >
        <div>I toggle loading every 5 seconds</div>
        <Button
          onClick={() => {
            setTrue2();
          }}
        >
          Show Another Modal
        </Button>
      </Modal>
      <Modal
        visible={state2}
        onCancel={() => {
          setFalse2();
        }}
        onOk={() => {
          setFalse2();
        }}
      >
        <div>I am not watching any model, so I dun have loading block</div>
      </Modal>
    </>
  );
};

export default ModalDemo;
