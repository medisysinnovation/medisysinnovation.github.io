import React, { useEffect } from 'react';

import { useModel } from 'dumi';
import { ProTable, ConfigProvider, ProInput } from '@medisys/component';
import { MIConfig, sleep } from '@medisys/utils';
import enUS from 'antd/es/locale/en_US';
import { defaultColumns } from './utils';

MIConfig.setConfig({
  model: useModel,
});
const EditableTableDemo = props => {
  useEffect(() => {}, []);
  return (
    <>
      <ConfigProvider locale={enUS}>
        <ProTable model="couter" columns={defaultColumns} />
      </ConfigProvider>
    </>
  );
};

export default EditableTableDemo;
