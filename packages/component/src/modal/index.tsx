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
let MIModal = _MIModal;
MIModal = Object.assign(MIModal, Modal);

export default MIModal;
