import React, {
  useEffect,
  ReactChild,
  ReactNode,
  createContext,
  useState,
  useRef,
} from 'react';
import { Modal, Select } from 'antd';
import { useBoolean, useMouse, useEventListener } from 'ahooks';

import { ModalProps } from 'antd/lib/Modal';

export interface MIModalProps extends ModalProps {
  triggerUnsavedChangesWarning?: boolean;
}
const MIModal: React.FC<MIModalProps> = ({
  triggerUnsavedChangesWarning,
  ...props
}) => {
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;

  const getClosetForm = (el: HTMLElement | null) => {
    let f = el?.closest('.ant-modal-content')?.querySelector('.medisys-form');

    if (!f) {
      return el?.querySelector('.medisys-form');
    }
    return f;
  };
  const { onCancel, visible, children, ...restProps } = props;
  const [state, { toggle, setTrue, setFalse }] = useBoolean(visible);
  useEffect(() => {
    const onDiscardForm = (e: FormEvent) => {
      if (onCancel) onCancel();
    };
    if (visible === true) {
      setTrue();

      setTimeout(() => {
        const form = getClosetForm(ref.current);
        if (ref.current)
          ref.current.addEventListener('discardform', onDiscardForm);
      }, 1);
    } else {
      setFalse();
    }

    return () => {
      if (ref.current)
        ref.current.removeEventListener('discardform', onDiscardForm);
    };
  }, [visible]);

  return (
    <div>
      <Modal
        {...restProps}
        visible={state}
        onCancel={e => {
          const form = getClosetForm(e.currentTarget);
          if (form && triggerUnsavedChangesWarning) {
            form.dispatchEvent(new CustomEvent('aboutdiscardform'));
            return false;
          } else {
            if (onCancel) onCancel(e);
          }
        }}
      >
        <div ref={ref}>{children}</div>
      </Modal>
    </div>
  );
};

export default MIModal;
