import _extends from '@babel/runtime/helpers/esm/extends';
import { Modal } from 'antd';
import _MIModal from './modal';
var MIModal = _MIModal;
MIModal = _extends(MIModal, Modal); // export interface StateProps {
//   loading: Object;
// }
// MIModal.updateState = (newState: StateProps) => {
//   const modalRoot = document.querySelector('.ant-modal-root');
//   if (modalRoot) {
//     const { loading } = newState;
//     console.log(loading);
//     document.dispatchEvent(
//       new CustomEvent('loadingstatechanged', {
//         bubbles: true,
//         detail: loading,
//       }),
//     );
//   }
// };

export default MIModal;
