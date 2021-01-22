import { Form, Input, Button } from 'antd';

import _MIButton from './button';

let MIButton = _MIButton as typeof Button;
MIButton = Object.assign(MIButton, Button);

export default MIButton;
