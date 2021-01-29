import _extends from '@babel/runtime/helpers/esm/extends';

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

import React from 'react'; // import { useWhyDidYouUpdate, useEventListener } from 'ahooks';

import { Button } from 'antd';

var MIButton = function MIButton(_a) {
  var triggerDiscard = _a.triggerDiscard,
    props = __rest(_a, ['triggerDiscard']);

  if (triggerDiscard) {
    var _onClick = props.onClick,
      restProps = __rest(props, ['onClick']);

    return /*#__PURE__*/ React.createElement(
      Button,
      _extends({}, restProps, {
        onClick: function onClick(e) {
          var form = e.currentTarget.closest('.medisys-form');

          if (form) {
            e.currentTarget.dispatchEvent(
              new CustomEvent('aboutdiscardform', {
                bubbles: true,
              }),
            );
            form.addEventListener('discardform', function() {
              if (_onClick) _onClick(e);
            });
          } else if (_onClick) {
            _onClick(e);
          }
        },
      }),
    );
  }

  return /*#__PURE__*/ React.createElement(Button, props);
};

export default MIButton;
