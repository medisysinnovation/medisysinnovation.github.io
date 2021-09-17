import React, { useState } from 'react';
import { useEventListener } from 'ahooks';

import MIButton, { MIButtonProps } from './button';

export interface MIProgressButtonProps extends MIButtonProps {
  model?: string;
}

const MIProgressButton: React.FC<MIProgressButtonProps> = ({
  model,
  ...restProps
}) => {
  const [spinning, setSpinning] = useState(false);

  //@ts-ignore
  useEventListener('loading_state_changed', (e: FormEvent) => {
    const models = e.detail?.models ?? {};
    if (model) setSpinning(!!models[model]);
  });
  return <MIButton loading={spinning} {...restProps} />;
};

export default MIProgressButton;
