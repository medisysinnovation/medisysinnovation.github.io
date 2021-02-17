import { Modal } from 'antd';

import _MIModal from './modal';

type ModalType = typeof Modal;

const MIModal = _MIModal as ModalType;
MIModal.info = Modal.info;

MIModal.success = Modal.info;

MIModal.error = Modal.error;

MIModal.warning = Modal.warning;

MIModal.warn = Modal.warn;

MIModal.confirm = Modal.confirm;

MIModal.destroyAll = Modal.destroyAll;

MIModal.config = Modal.config;

export default MIModal;
