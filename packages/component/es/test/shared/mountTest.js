import React from 'react';
import { mount } from 'enzyme';
export function mountTest(Component) {
  describe('mount and unmount', function() {
    // https://github.com/ant-design/ant-design/pull/18441
    it('component could be updated and unmounted without errors', function() {
      var wrapper = mount(/*#__PURE__*/ React.createElement(Component, null));
      expect(function() {
        wrapper.setProps({});
        wrapper.unmount();
      }).not.toThrow();
    });
  });
}
