import _slicedToArray from '@babel/runtime/helpers/esm/slicedToArray';
import React, { useEffect, useState } from 'react';
import MIFormContext from '../context/formContext';

var FormProvider = function FormProvider(_ref) {
  var children = _ref.children,
    onFormStateChange = _ref.onFormStateChange;

  var _useState = useState({
      discard: false,
    }),
    _useState2 = _slicedToArray(_useState, 2),
    contextData = _useState2[0],
    setContextData = _useState2[1];

  useEffect(
    function() {
      if (onFormStateChange) {
        onFormStateChange({
          contextData: contextData,
          onContextDataChange: function onContextDataChange(newContextData) {
            if (newContextData) {
              setContextData(newContextData);
            }
          },
        });
      }
    },
    [
      contextData === null || contextData === void 0
        ? void 0
        : contextData.discard,
    ],
  );
  return /*#__PURE__*/ React.createElement(
    MIFormContext.Provider,
    {
      value: {
        payload: contextData,
        setPayload: function setPayload(v) {
          console.log(v);
          if (v.discard !== contextData.discard)
            // if (v.discard && form?.isFieldsTouched()) setContextData(v);
            setContextData(v);
        },
      },
    },
    children,
  );
};

export default FormProvider;
