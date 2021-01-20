import React, { ReactChild, ReactNode, createContext, useState } from 'react';
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
  if (triggerUnsavedChangesWarning) {
    const { onClick, ...restProps } = props;
    return (
      <MIFormContext.Consumer>
        {props => {
          const { payload, setPayload } = props;
          return (
            <Button
              {...restProps}
              onClick={e => {
                console.log(payload, setPayload);
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
        }}
      </MIFormContext.Consumer>
    );
  }
  return <Button {...props} />;
};

export default MIButton;
