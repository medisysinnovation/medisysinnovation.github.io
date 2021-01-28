import React, {
  ReactChild,
  ReactNode,
  createContext,
  useState,
  useContext,
  useRef,
} from 'react';
import { useWhyDidYouUpdate, useEventListener } from 'ahooks';

import MIButton, { MIButtonProps } from './button';

export interface MIProgressButtonProps extends MIButtonProps {
  model?: string;
}

const MIProgressButton: React.FC<MIProgressButtonProps> = ({
  model,
  ...restProps
}) => {
  const [spinning, setSpinning] = useState(false);

  useEventListener('loadingstatechanged', (e: FormEvent) => {
    const models = e.detail?.models ?? {};
    if (model) setSpinning(!!models[model]);
  });
  return <MIButton loading={spinning} {...restProps} />;
};

export default MIProgressButton;
