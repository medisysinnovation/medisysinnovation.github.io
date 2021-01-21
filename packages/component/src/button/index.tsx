import React, {
  ReactChild,
  ReactNode,
  createContext,
  useState,
  useContext,
} from 'react';
import { Button, Select } from 'antd';
import { ButtonProps } from 'antd/lib/Button';
import MIFormContext from '../context/formContext';

export interface MIButtonProps extends ButtonProps {
  triggerUnsavedChangesWarning?: boolean;
}

const MIButton: React.FC<MIButtonProps> = ({
  triggerUnsavedChangesWarning,
  ...props
}) => {
  const context = useContext(MIFormContext);
  if (triggerUnsavedChangesWarning) {
    const { onClick, ...restProps } = props;
    const { payload, setPayload } = context;
    return (
      <Button
        {...restProps}
        onClick={e => {
          if (!payload?.discard && setPayload) {
            setPayload({
              discard: true,
              onClick: () => {
                if (onClick) onClick(e);
              },
            });
          } else if (setPayload) {
            e.preventDefault();
            return false;
          } else {
            if (onClick) onClick(e);
          }
        }}
      />
    );
  }
  return <Button {...props} />;
};

export default MIButton;
