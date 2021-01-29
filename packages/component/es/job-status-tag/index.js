import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import React from 'react';
import classnames from 'classnames';
import styles from './index.module.less';
import { jobStatusColorMapping } from '../constant/colorMap';
var textColor = {
  new: '#000',
};

var JobStatusTag = function JobStatusTag(props) {
  var _classnames;

  var _a;

  var _props$hidePrefix = props.hidePrefix,
    hidePrefix = _props$hidePrefix === void 0 ? false : _props$hidePrefix,
    _props$status = props.status,
    status = _props$status === void 0 ? '' : _props$status,
    isAttentionRequired = props.isAttentionRequired,
    className = props.className,
    _props$float = props['float'],
    float = _props$float === void 0 ? 'left' : _props$float;
  var classes = classnames(
    styles.tag,
    ((_classnames = {}),
    _defineProperty(_classnames, styles.floatLeft, float === 'left'),
    _defineProperty(_classnames, styles.floatRight, float === 'right'),
    _classnames),
    className,
  );
  var attnReqText = 'Attn. Required';
  var statusText = isAttentionRequired
    ? ''.concat(status, '(').concat(attnReqText, ')')
    : status;
  return /*#__PURE__*/ React.createElement(
    'div',
    {
      className: classes,
      style: {
        //@ts-ignore
        backgroundColor: jobStatusColorMapping[status.toLowerCase()],
        //@ts-ignore
        color:
          (_a = textColor[status.toLowerCase()]) !== null && _a !== void 0
            ? _a
            : '#fff',
      },
    },
    hidePrefix ? '' : 'Job Status:',
    statusText,
  );
};

export { JobStatusTag };
