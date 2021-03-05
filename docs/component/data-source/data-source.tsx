import React, { useEffect, useState } from 'react';
import { Input, ConfigProvider } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import { Form, Button, Modal, Select } from '@medisys/component';
import { MedisysConfig } from '@medisys/utils';
// console.dir(ConfigProvider);
// console.dir(ConfigProvider.ConfigContext.Consumer);
import { sleep } from '@medisys/utils';

const codeLoading = {};

MedisysConfig.config({
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

//     MedisysConfig.updateState({
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
  return (
    <>
      <div>
        <Button
          onClick={() => {
            const start = getRandomInt(test_data.users.length - 1);
            const end = start + getRandomInt(test_data.users.length - start);
            MedisysConfig.updateState({
              dataSource: {
                users: test_data.users.slice(start, end),
              },
            });
          }}
        >
          Load Data
        </Button>
        <Select code="users" mode="tags" />
      </div>

      <div>
        <Button
          onClick={() => {
            const start = getRandomInt(test_data.roles.length - 1);
            const end = start + getRandomInt(test_data.roles.length - start);
            MedisysConfig.updateState({
              dataSource: {
                roles: test_data.roles.slice(start, end),
              },
            });
          }}
        >
          Load Data
        </Button>
        <Select code="roles" mode="tags" value={1} />
      </div>

      <div>
        <Button
          onClick={() => {
            const start = getRandomInt(test_data.roles.length - 1);
            const end = start + getRandomInt(test_data.roles.length - start);
            MedisysConfig.updateState({
              dataSource: {
                roles: test_data.roles.slice(start, end),
              },
            });
          }}
        >
          Load Data
        </Button>
        <Select code="roles" mode="tags" />
      </div>
    </>
  );
};

export default DataSelectDemo;
