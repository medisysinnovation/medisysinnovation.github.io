import React, {
  useEffect,
  ReactChild,
  ReactNode,
  createContext,
  useState,
  useRef,
  MouseEvent,
} from 'react';
import { Modal, Select, Spin } from 'antd';
import { useBoolean, useMouse, useEventListener } from 'ahooks';
import { getStyle } from '@medisys/utils';
import { ModalProps } from 'antd/lib/Modal';

export interface MIModalProps extends ModalProps {
  triggerDiscard?: boolean;
}

// class Spin extends React.Component<MIModalProps, MIModalState> {

// }
const MIModal: React.FC<MIModalProps> = ({
  triggerDiscard = true,
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
  // console.log(state, visible);
  // const onDiscardForm = (e: FormEvent) => {
  //   if (onCancel)
  //     //@ts-ignore
  //     onCancel(e);
  // };
  useEventListener('discardform', (e: FormEvent) => {
    if (onCancel && ref.current) {
      const modalWrap = ref.current.closest('.ant-modal-wrap');
      if (getStyle(modalWrap, 'display') !== 'none') {
        //@ts-ignore
        onCancel(e);
      }
    }
  });
  useEffect(() => {
    // const onDiscardForm = (e: FormEvent) => {
    //   if (onCancel)
    //     //@ts-ignore
    //     onCancel(e);
    // };
    // console.log(ref.current, onDiscardForm);

    if (visible === true) {
      setTrue();

      // setTimeout(() => {
      //   if (ref.current)
      //     ref.current.addEventListener('discardform', onDiscardForm);
      // }, 1);
    } else {
      setFalse();
    }

    // return () => {
    //   if (ref.current)
    //     ref.current.removeEventListener('discardform', onDiscardForm);
    // };
  }, [visible]);

  return (
    <div>
      <Modal
        {...restProps}
        visible={state}
        onCancel={e => {
          const form = getClosetForm(e.currentTarget);
          // console.log(123123, form);

          if (form && triggerDiscard) {
            form.dispatchEvent(new CustomEvent('aboutdiscardform'));

            return false;
          } else {
            if (onCancel) onCancel(e);
          }
        }}
      >
        <Spin>
          <div ref={ref}>{children}</div>
        </Spin>
      </Modal>
    </div>
  );
};

export default MIModal;
