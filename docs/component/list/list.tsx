import React, { useEffect } from 'react';
import { useModel } from 'dumi';
import { ProList, Button, PageContext } from '@medisys/component';

import { MIConfig } from '@medisys/utils';

MIConfig.setConfig({
  model: useModel,
});
const ListDemo = props => {
  const { actionRef, table, ...rest } = PageContext.useContainer();
  // const actionRef = useRef();
  useEffect(() => {
    console.log(actionRef?.current?.getRecords());
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
      <ProList
        // actionRef={actionRef}
        model="couter"
        sort={{
          name: 'ascend',
        }}
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
        metas={{
          title: {
            dataIndex: 'name',
            defaultSortOrder: 'ascend',
          },
          avatar: undefined,
          actions: {
            render: (text, row) => [
              <a href={row.html_url} key="link">
                Action
              </a>,
            ],
          },
          content: {
            render: (dom, record) => {
              return <div>{record.description}</div>;
            },
          },
        }}
      />
    </>
  );
};

export default ListDemo;
