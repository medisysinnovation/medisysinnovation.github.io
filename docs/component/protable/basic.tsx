import React, { useEffect, useState } from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import type { ProColumns } from '@ant-design/pro-table';

import {useModel} from 'dumi';

import {
  Form,
  Button,
  Modal,
  Select,
  Input,
  ProTable,
} from '@medisys/component';
import { MIConfig, sleep } from '@medisys/utils';
// console.dir(ConfigProvider);
// console.dir(ConfigProvider.ConfigContext.Consumer);


const defaultColumns: ProColumns<any>[] = [
  {
    dataIndex: 'code',
    sorter: true,
    defaultSortOrder: 'ascend',
    formItemProps: {
      rules: [{ required: true }],
    },
  },
  {
    title: 'Display',
    dataIndex: 'displayValue',
    sorter: true,
    formItemProps: {
      rules: [{ required: true }],
    },
  },
  {
    dataIndex: 'description',
    hideInForm: true,
    fieldProps: {
      rows: 1,
    },
  },
];

MIConfig.setConfig({
  model:useModel
})
const InputBasicDemo = () => {
const m = useModel('couter')
console.log(m)
  useEffect(()=>{

  },[])

  return (
    <>
      <ProTable.Editable model='couter' columns={defaultColumns} />
    </>
  );
};

export default InputBasicDemo;
