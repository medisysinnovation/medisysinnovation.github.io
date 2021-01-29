/// <reference types="react" />
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
declare const MIFormContext: import('react').Context<MIFormContextType>;
export default MIFormContext;
