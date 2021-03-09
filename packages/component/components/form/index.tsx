import { Form } from 'antd';

import _MIForm from './form';
import useForm from './useForm';

type InternalFormType = typeof _MIForm;

interface FormInterface extends InternalFormType {
  useForm: typeof useForm;
  Item: typeof Form.Item;
  List: typeof Form.List;
  ErrorList: typeof Form.ErrorList;
  Provider: typeof Form.Provider;
}

let MIForm = _MIForm as FormInterface;

//@ts-ignore
// MIForm = Object.assign(MIForm, Form, { render: MIForm.render });
MIForm.Item = Form.Item;
MIForm.List = Form.List;
MIForm.ErrorList = Form.ErrorList;
MIForm.Provider = Form.Provider;
MIForm.useForm = useForm;
export default MIForm;
