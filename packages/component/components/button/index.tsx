import { Button } from 'antd';

import _MIButton from './button';
import ProgressButton from './progress-button';

export interface ButtonProps {
  ProgressButton: typeof ProgressButton;
  Group: typeof Button.Group;
  __ANT_BUTTON: boolean;
}

type Props = typeof _MIButton & ButtonProps;

let MIButton = _MIButton as Props;

MIButton.ProgressButton = ProgressButton;
MIButton.Group = Button.Group;

MIButton.displayName = 'Button';

MIButton.__ANT_BUTTON = true;

export default MIButton;
