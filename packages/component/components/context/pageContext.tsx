import React from 'react';
import type { ActionType } from '@ant-design/pro-table';

type PageContextType = {
  model?: string;
  table?:any;
  actionRef?: React.MutableRefObject<ActionType> | undefined;
  setValues: (newValues: any) => void;
};

const PageContext = React.createContext<PageContextType>({
  model: '',
  table:{},
  actionRef: undefined,
  setValues: (newValues: any) => {
    return newValues;
  },
});

export { PageContext };
