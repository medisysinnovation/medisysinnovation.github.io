import React, { useEffect } from 'react';
import { useModel } from 'dumi';
import { ProTable, Button, PageContext } from '@medisys/component';

import { MIConfig } from '@medisys/utils';
import { defaultColumns } from './utils';

MIConfig.setConfig({
  model: useModel,
});
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
          console.log(actionRef);
          console.log(actionRef?.current?.getRecords());

          // console.log(table);
        }}
      >
        Log Current Data
      </Button>
      <ProTable.Editable
        // actionRef={actionRef}
        model="couter"
        columns={defaultColumns}
        // rowSelection={{
        //   selectOnClick: true,
        // }}
        // postData={d => {
        //   console.log(d);
        //   return d;
        // }}
      />
    </>
  );
};

export default EditableTableDemo;
