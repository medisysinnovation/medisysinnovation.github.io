import React from 'react';
import { mount, render } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import scrollIntoView from 'scroll-into-view-if-needed';
import { Input, Form as AntdForm } from 'antd';
import { useBoolean } from 'ahooks';
import { getStyle } from '@medisys/utils';
import { mountTest, focusTest, click, sleep } from '../../test/shared';
import Select from '..';
jest.mock('scroll-into-view-if-needed');

describe('Select', () => {
  mountTest(Select);

  function toggleOpen(wrapper) {
    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      jest.runAllTimers();
      wrapper.update();
    });
  }

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // focusTest(Select, { refFocus: true });
  it('should have default notFoundContent', () => {
    const wrapper = mount(<Select />);
    toggleOpen(wrapper);
    expect(wrapper.find('.ant-select-item-option').length).toBeFalsy();
    expect(wrapper.find('.ant-empty').length).toBeTruthy();
  });
});
