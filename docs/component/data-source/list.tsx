import React, { useEffect, useState, useMemo } from 'react';
import { Input, ConfigProvider, Table } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import { Form, Button, Modal, Select, List } from '@medisys/component';
import { MIConfig, sleep } from '@medisys/utils';
// console.dir(ConfigProvider);
// console.dir(ConfigProvider.ConfigContext.Consumer);

console.dir(Table);
const codeLoading = {};

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
          code="users"
          size="small"
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          renderItem={item => (
            <List.Item>
              {item.id}/{item.text}
            </List.Item>
          )}
        />
      </div>
    </>
  );
};

export default DataSelectDemo;
