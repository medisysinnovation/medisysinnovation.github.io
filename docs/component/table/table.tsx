import React, { useEffect, useContext, useState, useRef } from 'react';

import { ProTable, PageContext, Button, ProInput } from '@medisys/component';
import { defaultColumns } from './utils';
import { sampleListData } from '../../../src/data';
const EditableTableDemo = props => {
  const { actionRef, table, ...rest } = PageContext.useContainer();
  // const actionRef = useRef();
  useEffect(() => {
    console.log(actionRef);
  }, []);
  return (
    <>
      <Button
        onClick={() => {
          // console.log(table);
          console.log(actionRef?.current);
          console.log(actionRef?.current?.getRecords?.());
          // actionRef?.current?.getRecords();
        }}
      >
        Log Current Data
      </Button>
      <ProTable
        // actionRef={actionRef}
        // ref={actionRef}
        dataSource={sampleListData}
        columns={defaultColumns}
        features={['edit']}
      />
    </>
  );
};

export default EditableTableDemo;
