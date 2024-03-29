import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Input, ConfigProvider } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  Form,
  Button,
  Modal,
  Select,
  ProSelect,
  ProForm,
} from '@medisys/component';
import { MIConfig, sleep } from '@medisys/utils';
// console.dir(ConfigProvider);
// console.dir(ConfigProvider.ConfigContext.Consumer);

const codeLoading = {};

MIConfig.setConfig({
  cache: false,
  dataLoader: async ({ code }) => {
    // console.log(code);

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
    { value: 1, label: 'U_ABC', roleId: 1 },
    { value: 2, label: 'U_CDE', roleId: 1 },
    { value: 3, label: 'U_FGH', roleId: 1 },
    { value: 4, label: 'U_EDS', roleId: 1 },
    { value: 5, label: 'U_ANI', roleId: 1 },
    { value: 6, label: 'U_LIT', roleId: 2 },
    { value: 7, label: 'U_RVS', roleId: 2 },
    { value: 8, label: 'U_UIJ', roleId: 2 },
  ],
  roles: [
    { value: 1, label: 'R_ABC' },
    { value: 2, label: 'R_CDE' },
  ],
};
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

interface T2 {
  value: string;
  label: string;
}

const request = async (
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
      data: [{ value: 1, label: 123 }],

      success: true,
      total: 123,
    });
  });
};
const DataSelectDemo = () => {
  const [v, setV] = useState(0);
  const myRef = React.useRef();
  const [ds, setDs] = useState([]);
  useEffect(() => {
    console.log(myRef);
    setTimeout(() => {
      setDs([
        { value: 1, label: 'U_ABC', roleId: 1 },
        { value: 2, label: 'U_CDE', roleId: 1 },
        { value: 3, label: 'U_FGH', roleId: 1 },
        { value: 4, label: 'U_EDS', roleId: 1 },
        { value: 5, label: 'U_ANI', roleId: 1 },
        { value: 6, label: 'U_LIT', roleId: 2 },
        { value: 7, label: 'U_RVS', roleId: 2 },
        { value: 8, label: 'U_UIJ', roleId: 2 },
      ]);
    }, 4000);
  }, []);

  const changeVal = useMemo(() => {
    return val => {
      console.log(val);
      setV(val);
    };
  }, []);
  const [currentRole, setCurrentRole] = useState(1);
  const [currentUser, setCurrentUser] = useState(1);

  const [search, setSearch] = useState([]);

  const fetchData = async v => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(test_data.users.filter(x => x.label.indexOf(v) >= 0));
      }, 1000);
    });
  };
  const onChange = (v: number, opt) => {
    setCurrentUser(v);
    setCurrentRole(opt.data?.roleId);
  };
  return (
    <>
      <Select
        placeholder="Test"
        ref={myRef}
        // code="abc"
        // request={request}
        options={search}
        showSearch
        filterOption={false}
        onSearch={v => {
          fetchData(v).then(r => {
            setSearch(r);
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
        onChange={onChange}
        onDataSourceChange={arr => {
          console.log(arr);
        }}
        readonly
        value={[1, 2]}
      />
      <Select
        placeholder="User"
        code="users"
        filter={(v, opt) => {
          return v.roleId === currentRole;
        }}
        onChange={onChange}
        value={currentUser}
        dependencies={[currentRole]}
      />
      <p>test</p>
      <Select
        value={currentUser}
        optionLabelProp={'fullLabel'}
        mode="multiple"
        onChange={onChange}
        readonly
      >
        {test_data.users
          // @ts-ignore
          ?.map((x: any) => {
            return (
              // @ts-ignore
              <Select.Option
                key={x.value}
                value={x.value}
                label={x.label}
                fullLabel={`${x.value} / ${x.label}`}
              >
                <div>
                  <label>Value / Label</label>
                  <br />
                  <span>
                    {x.value} / {x.label}
                  </span>
                </div>
              </Select.Option>
            );
          })}
      </Select>
      <Select
        placeholder="User"
        dataSource={ds}
        onChange={onChange}
        value={currentUser}
        dependencies={[currentRole]}
      />
      <ProForm initialValues={{ testuser: 1 }}>
        <ProSelect
          label="User"
          // readonly
          placeholder="User"
          dataSource={ds}
          name="testuser"
          onChange={onChange}
          value={currentUser}
          valueField="value"
          displayField="label"
        />
        <ProSelect
          label="Test Request Source"
          request={request}
          name="testuser"
          valueField="value"
          displayField="label"
        />
      </ProForm>

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
          //   return r.value === 7;
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
          //   return r.value === 7;
          // }}
          dependencies={[v]}
          value={123}
        />
      </div> */}
    </>
  );
};

export default DataSelectDemo;
