import { Modal } from 'antd';

import _MIModal from './modal';

export type ModalFunc = (
  props: any,
) => {
  // destroy: () => void;
  // update: (configUpdate: any) => void;
};

// export interface ModalStaticFunctions {
//   updateState: any;
// }

// declare type InternalFormType = typeof _MIModal;
// interface FormInterface extends InternalFormType {
//   useForm: typeof Form.useForm;
//   Item: typeof Form.Item;
//   List: typeof Form.List;
//   ErrorList: typeof Form.ErrorList;
//   Provider: typeof Form.Provider;
// }
// export {
//   FormInstance,
//   FormProps,
//   FormItemProps,
//   ErrorListProps,
//   Rule,
//   RuleObject,
//   RuleRender,
//   FormListProps,
// };

type ModalType = typeof _MIModal; //& ModalStaticFunctions;

let MIModal = _MIModal as ModalType;
MIModal = Object.assign(MIModal, Modal);

// export interface StateProps {
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
