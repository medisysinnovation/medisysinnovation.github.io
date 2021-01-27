import { Form, Input, Modal } from 'antd';
import {
  FormInstance,
  FormProps,
  FormItemProps,
  ErrorListProps,
  Rule,
  RuleObject,
  RuleRender,
  FormListProps,
} from 'antd/lib/Form';
import _MIModal from './modal';

export type ModalFunc = (
  props: any,
) => {
  // destroy: () => void;
  // update: (configUpdate: any) => void;
};

export interface ModalStaticFunctions {
  updateState: any;
}

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

type ModalType = typeof _MIModal & ModalStaticFunctions;

let MIModal = _MIModal as ModalType;
MIModal = Object.assign(MIModal, Modal);

MIModal.updateState = (abc: any) => {
  console.log(abc);
};

export default MIModal;
