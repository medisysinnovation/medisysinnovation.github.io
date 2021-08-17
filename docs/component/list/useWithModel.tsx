import React, { useEffect } from 'react';
import { useModel } from 'dumi';
import { ProList, Button, PageContext } from '@medisys/component';

import { MIConfig } from '@medisys/utils';

MIConfig.setConfig({
  model: useModel,
});
const ListDemo = props => {
  return (
    <>
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
