import React, { useEffect, useState, useMemo } from 'react';
import { Input, ConfigProvider } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import { Form, Button, Modal, Select, List } from '@medisys/component';
import { MIConfig, sleep } from '@medisys/utils';
// console.dir(ConfigProvider);
// console.dir(ConfigProvider.ConfigContext.Consumer);

const codeLoading = {};

MIConfig.setConfig({
  cache: false,
  dataLoader: async ({ code }) => {
    console.log(code);

    if (codeLoading[code]) {
      return;
    }
    console.log(code + ' start');
    codeLoading[code] = true;
    await sleep(3000);
    console.log(code + ' end');
    delete codeLoading[code];
    return test_data[code];
  },
});
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

const test_data = {
  users: [
    { id: 1, text: 'ABC' },
    { id: 2, text: 'CDE' },
    { id: 3, text: 'FGH' },
    { id: 4, text: 'EDS' },
    { id: 5, text: 'ANI' },
    { id: 6, text: 'LIT' },
    { id: 7, text: 'RVS' },
    { id: 8, text: 'UIJ' },
  ],
  roles: [
    { id: 1, text: 'ABC' },
    { id: 2, text: 'CDE' },
    { id: 3, text: 'FGH' },
    { id: 4, text: 'EDS' },
    { id: 5, text: 'ANI' },
    { id: 6, text: 'LIT' },
    { id: 7, text: 'RVS' },
    { id: 8, text: 'UIJ' },
  ],
};
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
        <Button
          onClick={() => {
            const start = getRandomInt(test_data.users.length - 1);
            const end = start + getRandomInt(test_data.users.length - start);
            MIConfig.updateState({
              dataSource: {
                users: test_data.users.slice(start, end),
              },
            });
          }}
        >
          Load Data
        </Button>
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
