import React, { useEffect, useContext, useState } from 'react';

import { ProTable, PageContext, Button } from '@medisys/component';
import { defaultColumns } from './utils';
import { sampleListData } from '../../../src/data';
import PageContainer from './PageContainer';
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
      <ProTable dataSource={sampleListData} columns={defaultColumns} />
    </>
  );
};

export default EditableTableDemo;
