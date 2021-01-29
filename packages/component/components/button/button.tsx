import React from 'react';
// import { useWhyDidYouUpdate, useEventListener } from 'ahooks';

import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/Button';

export interface MIButtonProps extends ButtonProps {
  triggerDiscard?: boolean;
}

const MIButton: React.FC<MIButtonProps> = ({ triggerDiscard, ...props }) => {
  if (triggerDiscard) {
    const { onClick, ...restProps } = props;
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
