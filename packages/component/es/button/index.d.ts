import _MIButton from './button';
import ProgressButton from './progress-button';
export interface ButtonProps {
  ProgressButton: typeof ProgressButton;
}
declare type Props = typeof _MIButton & ButtonProps;
declare let MIButton: Props;
export default MIButton;
