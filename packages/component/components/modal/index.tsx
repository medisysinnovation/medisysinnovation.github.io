import { Modal } from 'antd';

import _MIModal from './modal';

type ModalType = typeof Modal;

interface MIModalType extends ModalType {
  info: typeof Modal.info;
  success: typeof Modal.success;
  error: typeof Modal.error;
  warning: typeof Modal.warning;
  warn: typeof Modal.warning;
  confirm: typeof Modal.confirm;
  destroyAll: typeof Modal.destroyAll;
  config: typeof Modal.config;
}

const MIModal = _MIModal as MIModalType;
MIModal.info = Modal.info;

MIModal.success = Modal.success;

MIModal.error = Modal.error;

MIModal.warning = Modal.warning;

MIModal.warn = Modal.warn;

MIModal.confirm = Modal.confirm;

MIModal.destroyAll = Modal.destroyAll;

MIModal.config = Modal.config;

export default MIModal;
