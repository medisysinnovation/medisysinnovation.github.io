import React, { useEffect } from 'react';

import { ProTable, ConfigProvider } from '@medisys/component';
import { MIConfig, sleep } from '@medisys/utils';
import enUS from 'antd/es/locale/en_US';
import { defaultColumns } from './utils';
import { sampleListData } from '../../../src/data';

const EditableTableDemo = props => {
  useEffect(() => {}, []);
  return (
    <>
      <ConfigProvider locale={enUS}>
        <ProTable dataSource={sampleListData} columns={defaultColumns} />
      </ConfigProvider>
    </>
  );
};

export default EditableTableDemo;
