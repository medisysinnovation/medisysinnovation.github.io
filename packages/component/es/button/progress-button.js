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

import React, { useState } from 'react';
import { useEventListener } from 'ahooks';
import MIButton from './button';

var MIProgressButton = function MIProgressButton(_a) {
  var model = _a.model,
    restProps = __rest(_a, ['model']);

  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    spinning = _useState2[0],
    setSpinning = _useState2[1];

  useEventListener('loadingstatechanged', function(e) {
    var _a, _b;

    var models =
      (_b = (_a = e.detail) === null || _a === void 0 ? void 0 : _a.models) !==
        null && _b !== void 0
        ? _b
        : {};
    if (model) setSpinning(!!models[model]);
  });
  return /*#__PURE__*/ React.createElement(
    MIButton,
    _extends(
      {
        loading: spinning,
      },
      restProps,
    ),
  );
};

export default MIProgressButton;
