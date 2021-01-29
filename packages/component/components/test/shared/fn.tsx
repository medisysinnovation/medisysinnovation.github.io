import React from 'react';
import TestUtils from 'react-dom/test-utils';

export const click = (
  select: string,
  option: object = {
    button: 0,
  },
) => {
  //@ts-ignore
  TestUtils.Simulate.click(document.querySelector(select), option);
};
