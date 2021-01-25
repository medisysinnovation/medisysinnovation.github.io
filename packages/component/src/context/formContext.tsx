import { createContext } from 'react';

export interface MIFormContextPayload {
  discard: boolean;
  onClick?: () => void;
  form?: HTMLElement;
}
export interface MIFormContextType {
  payload?: MIFormContextPayload;
  setPayload?: (v: MIFormContextPayload) => void;
  form?: HTMLElement;
}

const MIFormContext = createContext<MIFormContextType>({
  payload: {
    discard: false,
  },
});

export default MIFormContext;
