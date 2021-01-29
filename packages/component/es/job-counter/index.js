import React from 'react';
import { Space } from 'antd';
import styles from './index.module.less';

var JobCounter = function JobCounter(props) {
  var title = props.title,
    count = props.count,
    color = props.color,
    titleColor = props.titleColor;
  return /*#__PURE__*/ React.createElement(
    Space,
    {
      direction: 'vertical',
      align: 'center',
      className: styles.counterContainer,
      style: {
        borderColor: color,
      },
    },
    /*#__PURE__*/ React.createElement(
      'div',
      {
        className: styles.countertitle,
        style: {
          backgroundColor: color,
          color: titleColor,
        },
      },
      title,
    ),
    /*#__PURE__*/ React.createElement(
      'h2',
      {
        style: {
          color: 'grey',
        },
      },
      count,
    ),
  );
};

export { JobCounter };
