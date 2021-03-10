import { Input } from 'antd';
import _MIInput from './input';
// import Input from './Input';
// import Group from './Group';
// import Search from './Search';
// import TextArea from './TextArea';
// import Password from './Password';

// export { InputProps } from './Input';
// export { GroupProps } from './Group';
// export { SearchProps } from './Search';
// export { TextAreaProps } from './TextArea';
// export { PasswordProps } from './Password';

export {
  InputProps,
  PasswordProps,
  GroupProps,
  SearchProps,
  TextAreaProps,
} from 'antd/es/input';

type InternalInputType = typeof _MIInput;

interface InputInterface extends InternalInputType {
  Group: typeof Input.Group;
  Search: typeof Input.Search;
  TextArea: typeof Input.TextArea;
  Password: typeof Input.Password;
}

let MIInput = _MIInput as InputInterface;

MIInput.Group = Input.Group;
MIInput.Search = Input.Search;
MIInput.TextArea = Input.TextArea;
MIInput.Password = Input.Password;
export default MIInput;
