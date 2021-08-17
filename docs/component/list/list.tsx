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
        metas={{
          title: {
            dataIndex: 'name',
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
