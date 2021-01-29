import { Button } from 'antd';

import _MIButton from './button';
import ProgressButton from './progress-button';

export interface ButtonProps {
  ProgressButton: typeof ProgressButton;
}

type Props = typeof _MIButton & ButtonProps;

let MIButton = _MIButton as Props;

MIButton = Object.assign(MIButton, Button);

MIButton.ProgressButton = ProgressButton;

export default MIButton;
