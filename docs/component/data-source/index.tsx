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
    { id: 1, text: 'U_ABC', roleId: 1 },
    { id: 2, text: 'U_CDE', roleId: 1 },
    { id: 3, text: 'U_FGH', roleId: 1 },
    { id: 4, text: 'U_EDS', roleId: 1 },
    { id: 5, text: 'U_ANI', roleId: 1 },
    { id: 6, text: 'U_LIT', roleId: 2 },
    { id: 7, text: 'U_RVS', roleId: 2 },
    { id: 8, text: 'U_UIJ', roleId: 2 },
  ],
  roles: [
    { id: 1, text: 'R_ABC' },
    { id: 2, text: 'R_CDE' },
  ],
};
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

interface T2 {
  id: string;
  name: string;
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
  const [currentRole, setCurrentRole] = useState(1);
  const [currentUser, setCurrentUser] = useState(1);

  console.log(currentRole, currentUser);
  return (
    <>
      <Select
        placeholder="Test"
        code="abc"
        request={async (
          // 第一个参数 params 查询表单和 params 参数的结合
          // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
          params: {
            pageSize: number;
            current: number;
          },
          sort,
          filter,
        ) => {
          return new Promise(resolve => {
            resolve({
              data: [{ id: 1, name: 123 }],

              success: true,
              total: 123,
            });
          });
        }}
        // onChange={(v: number, opt) => {
        //   setCurrentRole(v);
        //   setCurrentUser(undefined);

        //   console.log(v, opt);
        // }}
        // onDataSourceChange={arr => {
        //   console.log(arr);
        // }}
        // value={currentRole}
      />
      <Select
        placeholder="Role"
        code="roles"
        onChange={(v: number, opt) => {
          setCurrentRole(v);
          setCurrentUser(undefined);

          console.log(v, opt);
        }}
        onDataSourceChange={arr => {
          console.log(arr);
        }}
        value={currentRole}
      />
      <Select
        placeholder="User"
        code="users"
        filter={(v, opt) => {
          console.log(v.roleId === currentRole);
          return v.roleId === currentRole;
        }}
        onChange={(v: number, opt) => {
          console.log(v, opt);

          setCurrentUser(v);
          setCurrentRole(opt.data.roleId);
        }}
        value={currentUser}
        dependencies={[currentRole]}
      />
      {/* <div>
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
      </div> */}
    </>
  );
};

export default DataSelectDemo;
