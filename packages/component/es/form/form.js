import _extends from '@babel/runtime/helpers/esm/extends';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import _slicedToArray from '@babel/runtime/helpers/esm/slicedToArray';

var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value);
          });
    }

    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }

      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }

      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }

      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

var __rest =
  (this && this.__rest) ||
  function(s, e) {
    var t = {};

    for (var p in s) {
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    }

    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };

import React, { useEffect, useState, useRef } from 'react';
import { Form, Modal } from 'antd';
import { useEventListener } from 'ahooks';
import { Prompt } from 'react-router-dom';
import { useHistory, BrowserRouter as Router } from 'react-router-dom'; // import MIFormContext, { MIFormContextPayload } from '../context/formContext';

var showUnsavedPrompt = function showUnsavedPrompt(_ref) {
  var onOk = _ref.onOk,
    onCancel = _ref.onCancel;
  Modal.confirm({
    centered: true,
    onOk: onOk,
    onCancel: onCancel,
    cancelText: 'Cancel',
    okText: 'Confirm',
    okButtonProps: {
      type: 'default',
    },
    cancelButtonProps: {
      type: 'primary',
    },
    title: 'You have unsaved changes',
    content: /*#__PURE__*/ React.createElement(
      React.Fragment,
      null,
      /*#__PURE__*/ React.createElement(
        'h4',
        null,
        'Confirm to leave without saving your changes?',
      ),
    ),
  });
}; // const _MIForm: React.FC<MIFormProps> = ({

var _MIForm = function _MIForm(props, ref) {
  var _props$discardCheck = props.discardCheck,
    discardCheck = _props$discardCheck === void 0 ? false : _props$discardCheck,
    restProps = __rest(props, ['discardCheck']);

  var form = restProps.form,
    children = restProps.children;

  var _Form$useForm = Form.useForm(form),
    _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
    wrapForm = _Form$useForm2[0];

  React.useImperativeHandle(ref, function() {
    return wrapForm;
  });
  var divRef = useRef(); //useRef<HTMLElement>();

  var history = useHistory();

  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    showConfirm = _useState2[0],
    setShowConfirm = _useState2[1];

  var _restProps$onDirtyChe = restProps.onDirtyCheck,
    onDirtyCheck =
      _restProps$onDirtyChe === void 0
        ? function(currentLocation) {
            console.log(currentLocation.pathname, history.location.pathname);
            if (currentLocation.pathname === history.location.pathname)
              return false;
            showUnsavedPrompt({
              onOk: function onOk() {
                return __awaiter(
                  void 0,
                  void 0,
                  void 0,
                  /*#__PURE__*/ _regeneratorRuntime.mark(function _callee() {
                    return _regeneratorRuntime.wrap(function _callee$(
                      _context,
                    ) {
                      while (1) {
                        switch ((_context.prev = _context.next)) {
                          case 0:
                            wrapForm.resetFields();
                            setTimeout(function() {
                              history.push(currentLocation.pathname);
                            }, 1);

                          case 2:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    },
                    _callee);
                  }),
                );
              },
              onCancel: function onCancel() {},
            });
            return false;
          }
        : _restProps$onDirtyChe; // useWhyDidYouUpdate('useWhyDidYouUpdateComponent', { ...restProps });

  var discardForm = function discardForm() {
    setShowConfirm(false);
    wrapForm.resetFields();
    if (divRef.current)
      divRef.current.dispatchEvent(
        new CustomEvent('discardform', {
          bubbles: true,
        }),
      );
  };

  var tryDiscardForm = function tryDiscardForm() {
    if (
      (wrapForm === null || wrapForm === void 0
        ? void 0
        : wrapForm.isFieldsTouched()) &&
      discardCheck
    ) {
      setShowConfirm(true);
    } else {
      discardForm();
    }
  };

  useEventListener('aboutdiscardform', tryDiscardForm, {
    target: divRef,
  });

  var onBeforeUnloadCheck = function onBeforeUnloadCheck(event) {
    if (
      !(wrapForm === null || wrapForm === void 0
        ? void 0
        : wrapForm.isFieldsTouched())
    )
      return true; // To show a native browser "Unsaved changes prompt"
    // Cancel the event as stated by the standard.

    event.preventDefault(); // Older browsers supported custom message
    // eslint-disable-next-line no-param-reassign

    event.returnValue = '';
  };

  useEventListener('beforeunload', onBeforeUnloadCheck);
  useEffect(
    function() {
      if (showConfirm) {
        if (
          wrapForm === null || wrapForm === void 0
            ? void 0
            : wrapForm.isFieldsTouched()
        ) {
          showUnsavedPrompt({
            onOk: function onOk() {
              discardForm();
            },
            onCancel: function onCancel() {
              setShowConfirm(false);
            },
          });
        }
      }
    },
    [showConfirm],
  );
  var element = /*#__PURE__*/ React.createElement(
    'div',
    {
      ref: divRef,
      className: 'medisys-form',
    },
    /*#__PURE__*/ React.createElement(
      Form,
      _extends({}, restProps, {
        form: wrapForm,
      }),
      discardCheck &&
        /*#__PURE__*/ React.createElement(
          Form.Item,
          {
            shouldUpdate: !showConfirm,
            style: {
              display: 'none',
            },
          },
          function() {
            var _a;

            var isTouched =
              (_a =
                wrapForm === null || wrapForm === void 0
                  ? void 0
                  : wrapForm.isFieldsTouched()) !== null && _a !== void 0
                ? _a
                : false; // if (isTouched) {
            //   window.addEventListener('beforeunload', onBeforeUnloadCheck);
            // }

            return /*#__PURE__*/ React.createElement(
              React.Fragment,
              null,
              /*#__PURE__*/ React.createElement(Prompt, {
                message: onDirtyCheck,
                when: isTouched,
              }),
            );
          },
        ),
      children,
    ),
  );
  if (!history) return /*#__PURE__*/ React.createElement(Router, null, element);
  return /*#__PURE__*/ React.createElement(React.Fragment, null, element);
};

var MIForm = /*#__PURE__*/ React.forwardRef(_MIForm); // const { useForm, List } = Form;
// export { useForm, List };

export default MIForm;
