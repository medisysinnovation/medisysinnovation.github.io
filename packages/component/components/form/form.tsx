import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  MutableRefObject,
  RefObject,
} from 'react';
import { Form, Modal } from 'antd';
import { useWhyDidYouUpdate, useEventListener } from 'ahooks';
import { Prompt, PromptProps } from 'react-router-dom';
import { useHistory, BrowserRouter as Router } from 'react-router-dom';

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
// import MIFormContext, { MIFormContextPayload } from '../context/formContext';

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

export interface MIFormProps<Values = any> extends FormProps<Values> {
  discardCheck?: boolean;
  onDirtyCheck?: PromptProps['message'];
}
// const _MIForm: React.FC<MIFormProps> = ({
const _MIForm: React.ForwardRefRenderFunction<
  FormInstance | undefined,
  MIFormProps
> = (props, ref) => {
  const { discardCheck = false, ...restProps } = props;
  const { form, children } = restProps;
  const [wrapForm] = Form.useForm(form);
  React.useImperativeHandle(ref, () => {
    return wrapForm;
  });

  const divRef = useRef() as React.MutableRefObject<HTMLInputElement>; //useRef<HTMLElement>();
  const history = useHistory();
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    onDirtyCheck = (currentLocation: any, action: any) => {
      console.log(currentLocation.pathname, history.location.pathname);
      if (currentLocation.pathname === history.location.pathname) return false;
      showUnsavedPrompt({
        onOk: async () => {
          wrapForm.resetFields();
          setTimeout(() => {
            history.push(currentLocation.pathname);
          }, 1);
        },
        onCancel: () => {},
      });
      return false;
    },
  } = restProps;

  // useWhyDidYouUpdate('useWhyDidYouUpdateComponent', { ...restProps });
  const discardForm = () => {
    setShowConfirm(false);
    wrapForm.resetFields();
    if (divRef.current)
      divRef.current.dispatchEvent(
        new CustomEvent('discardform', { bubbles: true }),
      );
  };

  const tryDiscardForm = (e: FormEvent) => {
    if (wrapForm?.isFieldsTouched() && discardCheck) {
      setShowConfirm(true);
    } else {
      discardForm();
    }
  };
  useEventListener('aboutdiscardform', tryDiscardForm, {
    target: divRef,
  });

  const onBeforeUnloadCheck = (event: BeforeUnloadEvent) => {
    if (!wrapForm?.isFieldsTouched()) return true;
    // To show a native browser "Unsaved changes prompt"

    // Cancel the event as stated by the standard.
    event.preventDefault();
    // Older browsers supported custom message
    // eslint-disable-next-line no-param-reassign
    event.returnValue = '';
  };
  useEventListener('beforeunload', onBeforeUnloadCheck);

  useEffect(() => {
    if (showConfirm) {
      if (wrapForm?.isFieldsTouched()) {
        showUnsavedPrompt({
          onOk: () => {
            discardForm();
          },
          onCancel: () => {
            setShowConfirm(false);
          },
        });
      }
    }
  }, [showConfirm]);
  const element = (
    <div ref={divRef} className="medisys-form">
      <Form {...restProps} form={wrapForm}>
        {discardCheck && (
          <Form.Item shouldUpdate={!showConfirm} style={{ display: 'none' }}>
            {() => {
              const isTouched = wrapForm?.isFieldsTouched() ?? false;

              // if (isTouched) {
              //   window.addEventListener('beforeunload', onBeforeUnloadCheck);
              // }
              return (
                <>
                  <Prompt message={onDirtyCheck} when={isTouched} />
                </>
              );
            }}
          </Form.Item>
        )}
        {children}
      </Form>
    </div>
  );
  if (!history) return <Router>{element}</Router>;
  return <>{element}</>;
};
const MIForm = React.forwardRef<FormInstance | undefined, MIFormProps>(
  _MIForm,
) as <Values = any>(
  props: React.PropsWithChildren<MIFormProps<Values>> & {
    ref?: React.Ref<FormInstance<Values>>;
  },
) => React.ReactElement;

// const { useForm, List } = Form;
// export { useForm, List };

export default MIForm;
