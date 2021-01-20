import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Form, Input, Modal } from 'antd';
import { useWhyDidYouUpdate } from 'ahooks';
// import { Prompt, history } from 'umi';
import { Prompt } from 'react-router-dom';
// import { history } from 'umi';

import { useHistory } from 'react-router-dom';

import {
  FormInstance,
  FormProps,
  FormItemProps,
  ErrorListProps,
  Rule,
  RuleObject,
  RuleRender,
  FormListProps,
} from 'antd/lib/Form';
import MIFormContext, { MIFormContextPayload } from '../context/formContext';

const showUnsavedPrompt = ({
  onOk,
  onCancel,
}: {
  onOk: () => void;
  onCancel: () => void;
}) => {
  Modal.confirm({
    centered: true,
    onOk,
    onCancel,
    cancelText: 'Cancel',
    okText: 'Confirm',
    okButtonProps: {
      type: 'default',
    },
    cancelButtonProps: {
      type: 'primary',
    },
    title: 'You have unsaved changes',
    content: (
      <>
        <h4>Confirm to leave without saving your changes?</h4>
      </>
    ),
  });
};

export interface MIFormProps extends FormProps {
  message?: string | ((location: any, action: any) => string | boolean);
}
const _MIForm: React.FC<MIFormProps> = props => {
  const [confirmPrompted, setConfirmPrompted] = useState(false);

  const history = useHistory();
  const { form, children } = props;
  const {
    message = (currentLocation: any, action: any) => {
      // console.log(currentLocation, window.location, history.location);
      if (currentLocation.pathname === history.location.pathname) return false;
      showUnsavedPrompt({
        onOk: async () => {
          setConfirmPrompted(true);
          setTimeout(() => {
            history.push(currentLocation.pathname);
          }, 1);
        },
        onCancel: () => {},
      });
      return false;
    },
    ...restProps
  } = props;

  const beforeUnloadCheck = (event: BeforeUnloadEvent) => {
    // To show a native browser "Unsaved changes prompt"

    // Cancel the event as stated by the standard.
    event.preventDefault();
    // Older browsers supported custom message
    // eslint-disable-next-line no-param-reassign
    event.returnValue = '';
  };
  useWhyDidYouUpdate('useWhyDidYouUpdateComponent', { ...props });
  useEffect(() => {
    // setTimeout(() => {
    //   history.push('/guide');
    // }, 2000);
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadCheck);
    };
  }, []);

  const [contextData, setContextData] = useState<MIFormContextPayload>({
    discard: false,
  });
  useEffect(() => {
    // if (form?.isFieldsTouched() && contextData?.discard && !confirmPrompted) {
    if (contextData?.discard && !confirmPrompted) {
      if (form?.isFieldsTouched()) {
        setConfirmPrompted(true);
        showUnsavedPrompt({
          onOk: () => {
            if (contextData?.onClick !== undefined) contextData.onClick();
          },
          onCancel: () => {
            setConfirmPrompted(false);
            setContextData({
              discard: false,
            });
          },
        });
      } else {
        if (contextData?.onClick !== undefined) contextData.onClick();
      }
    }
  }, [contextData?.discard]);
  return (
    <>
      <MIFormContext.Provider
        value={{
          payload: contextData,
          setPayload: (v: MIFormContextPayload) => {
            console.log(v);
            if (v.discard !== contextData.discard)
              // if (v.discard && form?.isFieldsTouched()) setContextData(v);
              setContextData(v);
          },
        }}
      >
        <Form {...restProps}>
          <Form.Item
            shouldUpdate={!confirmPrompted}
            style={{ display: 'none' }}
          >
            {() => {
              const isDirty = form?.isFieldsTouched();
              if (isDirty) {
                window.addEventListener('beforeunload', beforeUnloadCheck);
              }
              return <Prompt message={message} when={isDirty} />;
            }}
          </Form.Item>
          {children}
        </Form>
      </MIFormContext.Provider>
    </>
  );
};

const { useForm, List } = Form;
export { useForm, List };
export default _MIForm;
