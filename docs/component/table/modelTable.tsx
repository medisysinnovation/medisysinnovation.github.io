import React, { useEffect, useRef, useContext } from 'react';

import { useModel } from 'dumi';
import {
  ProTable,
  ConfigProvider,
  Button,
  PageContext,
} from '@medisys/component';

import { MIConfig, sleep } from '@medisys/utils';
import enUS from 'antd/es/locale/en_US';
import { defaultColumns } from './utils';

MIConfig.setConfig({
  model: useModel,
});
const EditableTableDemo = props => {
  const { actionRef, table, ...rest } = useContext(PageContext);

  return (
    <>
      <Button
        onClick={() => {
          console.log(table);
        }}
      >
        Log Current Data
      </Button>
      <ProTable.Editable
        model="couter"
        columns={defaultColumns}
        postData={d => {
          console.log(d);
          return d;
        }}
      />
    </>
  );
};

export default EditableTableDemo;
