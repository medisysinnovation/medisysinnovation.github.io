import React, { useEffect, useState, useMemo } from 'react';
import { Input, ConfigProvider } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import { Form, Button, Modal, Select } from '@medisys/component';
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
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const DataSelectDemo = () => {
  const [v, setV] = useState(0);
  const myRef = React.useRef();

  useEffect(() => {
    console.log(myRef);
  }, []);

  const changeVal = useMemo(() => {
    return val => {
      console.log(val);
      setV(val);
    };
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
        <Select ref={myRef} code="users" mode="tags" />
      </div>

      <div>
        <Button
          onClick={() => {
            const start = getRandomInt(test_data.roles.length - 1);
            const end = start + getRandomInt(test_data.roles.length - start);
            MIConfig.updateState({
              dataSource: {
                roles: test_data.roles.slice(start, end),
              },
            });
          }}
        >
          Load Data
        </Button>
        <Select
          code="roles"
          // filter={r => {
          //   console.log(r);
          //   return r.id === 7;
          // }}
          mode="tags"
          value={1}
          onChange={changeVal}
        />
      </div>

      <div>
        <Button
          onClick={() => {
            const start = getRandomInt(test_data.roles.length - 1);
            const end = start + getRandomInt(test_data.roles.length - start);
            MIConfig.updateState({
              dataSource: {
                roles: test_data.roles.slice(start, end),
              },
            });
          }}
        >
          Load Data
        </Button>
        <Select
          code="roles"
          // url={'test/weree'}
          // mode="tags"
          // filter={r => {
          //   return r.id === 7;
          // }}
          dependencies={[v]}
          value={123}
        />
      </div>
    </>
  );
};

export default DataSelectDemo;
