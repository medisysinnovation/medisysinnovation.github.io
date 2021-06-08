import React, { useEffect, useContext, useState, useRef } from 'react';

import { ProTable, PageContext, Button } from '@medisys/component';
import { defaultColumns } from './utils';
import { sampleListData } from '../../../src/data';
import PageContainer from './PageContainer';
const EditableTableDemo = props => {
  const { actionRef, table, ...rest } = PageContext.useContainer();
  useEffect(() => {
    console.log(actionRef);
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          console.log(table);
          console.log(actionRef);
          console.log(actionRef?.current?.getRecords());
        }}
      >
        Log Current Data
      </Button>
      <ProTable
        actionRef={actionRef}
        dataSource={sampleListData}
        columns={defaultColumns}
      />
    </>
  );
};

export default EditableTableDemo;
