import _extends from '@babel/runtime/helpers/esm/extends';
import _slicedToArray from '@babel/runtime/helpers/esm/slicedToArray';

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
import { Modal, Spin } from 'antd';
import { useBoolean, useEventListener } from 'ahooks';
import { getStyle } from '@medisys/utils'; // class Spin extends React.Component<MIModalProps, MIModalState> {
// }

var isVisible = function isVisible(element) {
  if (!element) return false;
  var modalWrap = element.closest('.ant-modal-wrap');
  return getStyle(modalWrap, 'display') !== 'none';
};

var MIModal = function MIModal(_a) {
  var _a$triggerDiscard = _a.triggerDiscard,
    triggerDiscard = _a$triggerDiscard === void 0 ? true : _a$triggerDiscard,
    model = _a.model,
    props = __rest(_a, ['triggerDiscard', 'model']);

  var ref = useRef();

  var getClosetForm = function getClosetForm(el) {
    var _a;

    var f =
      (_a =
        el === null || el === void 0
          ? void 0
          : el.closest('.ant-modal-content')) === null || _a === void 0
        ? void 0
        : _a.querySelector('.medisys-form');

    if (!f) {
      return el === null || el === void 0
        ? void 0
        : el.querySelector('.medisys-form');
    }

    return f;
  };

  var _onCancel = props.onCancel,
    visible = props.visible,
    children = props.children,
    restProps = __rest(props, ['onCancel', 'visible', 'children']);

  var _useBoolean = useBoolean(visible),
    _useBoolean2 = _slicedToArray(_useBoolean, 2),
    state = _useBoolean2[0],
    _useBoolean2$ = _useBoolean2[1],
    setTrue = _useBoolean2$.setTrue,
    setFalse = _useBoolean2$.setFalse;

  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    spinning = _useState2[0],
    setSpinning = _useState2[1]; // console.log(state, visible);
  // const onDiscardForm = (e: FormEvent) => {
  //   if (onCancel)
  //     //@ts-ignore
  //     onCancel(e);
  // };

  useEventListener('discardform', function(e) {
    if (
      _onCancel &&
      isVisible(ref === null || ref === void 0 ? void 0 : ref.current)
    ) {
      //@ts-ignore
      _onCancel(e);
    }
  });
  useEventListener('loadingstatechanged', function(e) {
    var _a, _b;

    if (
      model &&
      isVisible(ref === null || ref === void 0 ? void 0 : ref.current)
    ) {
      var models =
        (_b =
          (_a = e.detail) === null || _a === void 0 ? void 0 : _a.models) !==
          null && _b !== void 0
          ? _b
          : {};
      console.log(model, models[model]);
      setSpinning(!!models[model]);
    }
  });
  useEffect(
    function() {
      // const onDiscardForm = (e: FormEvent) => {
      //   if (onCancel)
      //     //@ts-ignore
      //     onCancel(e);
      // };
      // console.log(ref.current, onDiscardForm);
      if (visible === true) {
        setTrue(); // setTimeout(() => {
        //   if (ref.current)
        //     ref.current.addEventListener('discardform', onDiscardForm);
        // }, 1);
      } else {
        setFalse();
      } // return () => {
      //   if (ref.current)
      //     ref.current.removeEventListener('discardform', onDiscardForm);
      // };
    },
    [visible],
  );
  return /*#__PURE__*/ React.createElement(
    'div',
    null,
    /*#__PURE__*/ React.createElement(
      Modal, // footer={renderFooter()}
      _extends({}, restProps, {
        confirmLoading: spinning,
        visible: state,
        onCancel: function onCancel(e) {
          var form = getClosetForm(e.currentTarget); // console.log(123123, form);

          if (form && triggerDiscard) {
            form.dispatchEvent(new CustomEvent('aboutdiscardform'));
            return false;
          } else {
            if (_onCancel) _onCancel(e);
          }
        },
      }),
      /*#__PURE__*/ React.createElement(
        Spin,
        {
          spinning: spinning,
        },
        /*#__PURE__*/ React.createElement(
          'div',
          {
            ref: ref,
          },
          children,
        ),
      ),
    ),
  );
};

export default MIModal;
