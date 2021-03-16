import React, { useEffect, useState, useMemo } from 'react';
import { Input, ConfigProvider } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import { Form, Button, Modal, Select, List } from '@medisys/component';
import { MIConfig, sleep } from '@medisys/utils';
// console.dir(ConfigProvider);
// console.dir(ConfigProvider.ConfigContext.Consumer);

const codeLoading = {};

// Select.config.loader({
//   loader: async ({ code }) => {
//     if (codeLoading[code]) {
//       return;
//     }
//     console.log(code + ' start');
//     codeLoading[code] = true;
//     await sleep(10000);
//     console.log(code + ' end');
//     delete codeLoading[code];

//     MIConfig.updateState({
//       dataSource: {
//         [code]: users,
//       },
//     });
//   },
// });

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const DataSelectDemo = () => {
  const [v, setV] = useState(0);
  const myRef = React.useRef();
  const changeVal = useMemo(() => {
    return val => {
      console.log(val);
      setV(val);
    };
  }, []);

  useEffect(() => {
    console.log(myRef);
  }, []);
  return (
    <>
      <div>
        <List
          ref={myRef}
          code="users"
          size="small"
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={data}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </div>
    </>
  );
};

export default DataSelectDemo;
