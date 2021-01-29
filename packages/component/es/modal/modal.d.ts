import React from 'react';
import { ModalProps } from 'antd/lib/Modal';
export interface ModalLocale {
  okText: string;
  cancelText: string;
  justOkText: string;
}
export interface MIModalProps extends ModalProps {
  triggerDiscard?: boolean;
  model?: string;
}
declare const MIModal: React.FC<MIModalProps>;
export default MIModal;
