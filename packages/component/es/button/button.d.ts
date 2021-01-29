import React from 'react';
import { ButtonProps } from 'antd/lib/Button';
export interface MIButtonProps extends ButtonProps {
  triggerDiscard?: boolean;
}
declare const MIButton: React.FC<MIButtonProps>;
export default MIButton;
