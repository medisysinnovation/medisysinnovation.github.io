import { createContext } from 'react';

export interface MIFormContextPayload {
  discard: boolean;
  onClick?: () => void;
}
export interface MIFormContextType {
  payload?: MIFormContextPayload;
  setPayload?: (v: MIFormContextPayload) => void;
}

const MIFormContext = createContext<MIFormContextType>({});

export default MIFormContext;
