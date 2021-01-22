const React = require('react');
React.useLayoutEffect = React.useEffect;

// eslint-disable-next-line no-console
console.log('Current React Version:', React.version);

const Enzyme = require('enzyme');

const Adapter = require('@wojtekmaj/enzyme-adapter-react-17'); //require('enzyme-adapter-react-16');
Enzyme.configure({ adapter: new Adapter() });

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
