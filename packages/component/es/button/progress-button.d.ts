import React from 'react';
import { MIButtonProps } from './button';
export interface MIProgressButtonProps extends MIButtonProps {
  model?: string;
}
declare const MIProgressButton: React.FC<MIProgressButtonProps>;
export default MIProgressButton;
