import TestUtils from 'react-dom/test-utils';
export var click = function click(select) {
  var option =
    arguments.length > 1 && arguments[1] !== undefined
      ? arguments[1]
      : {
          button: 0,
        };
  //@ts-ignore
  TestUtils.Simulate.click(document.querySelector(select), option);
};
