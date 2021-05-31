import React from 'react';
import type { ActionType } from '@ant-design/pro-table';

type PageContextType = {
  model: string;
  actionRef: React.MutableRefObject<ActionType> | undefined;
  setValues: (newValues: any) => void;
};

const PageContext = React.createContext<PageContextType>({
  model: '',
  actionRef: undefined,
  setValues: (newValues: any) => {
    return newValues;
  },
});

export { PageContext };
