import { MIActionType } from '../hook/typing';
import React, { useRef, useState } from 'react';
import { createContainer } from '../utils/usestated-next';
type PageContextType = {
  model?: string;
  table?: any;
  actionRef?: React.MutableRefObject<MIActionType> | undefined;
  updateState: (newValues: any) => void;
};

const useCustomHook = () => {
  const actionRef = useRef<MIActionType>();

  const [state, setState] = useState({
    model: '',
    table: {},
    actionRef,
  });
  const updateState = (newValues: any) => {
    setState({
      ...state,
      ...newValues,
    });
  };
  return {
    ...state,
    updateState,
  };
};

//@ts-ignore
const PageContext = createContainer<PageContextType>(useCustomHook);

export { PageContext };
