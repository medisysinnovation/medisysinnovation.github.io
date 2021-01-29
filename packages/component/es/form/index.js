import _extends from '@babel/runtime/helpers/esm/extends';
import { Form } from 'antd';
import _MIForm from './form'; // declare type InternalFormType = typeof _MIForm;
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
// const MIForm = _MIForm as FormInterface;
// MIForm.Item = Form.Item;
// MIForm.List = Form.List;
// MIForm.ErrorList = Form.ErrorList;
// MIForm.useForm = Form.useForm;
// MIForm.Provider = Form.Provider;

var MIForm = _MIForm; //@ts-ignore

MIForm = _extends(MIForm, Form, {
  render: MIForm.render,
});
export default MIForm;