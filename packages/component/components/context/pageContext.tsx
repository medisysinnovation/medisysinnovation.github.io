import React,{useRef, useState} from 'react';
import { createContainer } from "../utils/usestated-next"
import type {MIActionType} from '../pro-table/typing'
type PageContextType = {
  model?: string;
  table?:any;
  actionRef?: React.MutableRefObject<MIActionType> | undefined;
  setValues: (newValues: any) => void;
};

const useCustomHook =()=>{
  const actionRef = useRef<MIActionType>()

  const [state, setState] = useState({
    model: '',
    table:{},
    actionRef,
  })
  const updateState =(newValues:any)=>{
    setState({
      ...state,
      ...newValues
    })
  }
  return {
    ...state,
    updateState
  }
}

//@ts-ignore
const PageContext = createContainer<PageContextType>(useCustomHook);

export { PageContext };
