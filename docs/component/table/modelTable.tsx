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
      <ProTable
        // actionRef={actionRef}
        model="couter"
        // request={async (a, b, c, d) => {
        //   console.log(a, b, c, d);
        //   return {
        //     data: [],
        //     // success 请返回 true，
        //     // 不然 table 会停止解析数据，即使有数据
        //     success: true,
        //     // 不传会使用 data 的长度，如果是分页一定要传
        //     total: 123,
        //   };
        // }}
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
