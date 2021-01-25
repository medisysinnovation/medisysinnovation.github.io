import React, {
  ReactChild,
  ReactNode,
  createContext,
  useState,
  useContext,
  useRef,
} from 'react';
import { useWhyDidYouUpdate, useEventListener } from 'ahooks';

import { Button, Select } from 'antd';
import { ButtonProps } from 'antd/lib/Button';
import MIFormContext from '../context/formContext';

export interface MIButtonProps extends ButtonProps {
  triggerDiscard?: boolean;
}

const MIButton: React.FC<MIButtonProps> = ({ triggerDiscard, ...props }) => {
  const context = useContext(MIFormContext);

  if (triggerDiscard) {
    const { onClick, ...restProps } = props;
    const { payload, setPayload, form } = context;
    return (
      <Button
        {...restProps}
        onClick={e => {
          const form = e.currentTarget.closest('.medisys-form');
          if (form) {
            e.currentTarget.dispatchEvent(
              new CustomEvent('aboutdiscardform', { bubbles: true }),
            );
            form.addEventListener('discardform', () => {
              if (onClick) onClick(e);
            });
          } else if (onClick) {
            onClick(e);
          }
        }}
      />
    );
  }
  return <Button {...props} />;
};

export default MIButton;
