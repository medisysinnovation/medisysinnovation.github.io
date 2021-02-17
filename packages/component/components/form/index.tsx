import { Form } from 'antd';

import _MIForm from './form';

type InternalFormType = typeof _MIForm;

interface FormInterface extends InternalFormType {
  useForm: typeof Form.useForm;
  Item: typeof Form.Item;
  List: typeof Form.List;
  ErrorList: typeof Form.ErrorList;
  Provider: typeof Form.Provider;

  /** @deprecated Only for warning usage. Do not use. */
  create: () => void;
}

let MIForm = _MIForm as FormInterface;

//@ts-ignore
MIForm = Object.assign(MIForm, Form, { render: MIForm.render });
export default MIForm;
