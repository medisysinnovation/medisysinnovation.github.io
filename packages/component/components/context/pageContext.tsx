import React,{useRef} from 'react';
import { createContainer } from "unstated-next"
import type {MIActionType} from '../pro-table/typing'
type PageContextType = {
  model?: string;
  table?:any;
  actionRef?: React.MutableRefObject<MIActionType> | undefined;
  setValues: (newValues: any) => void;
};

const useCustomHook =()=>{
  const actionRef = useRef()
  return {
    model: '',
    table:{},
    actionRef,
    setValues: (newValues: any) => {
      return newValues;
    },
  }
}

//@ts-ignore
const PageContext = createContainer<PageContextType>(useCustomHook);

export { PageContext };
