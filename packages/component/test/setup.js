const React = require('react');
React.useLayoutEffect = React.useEffect;

// eslint-disable-next-line no-console
console.log('Current React Version:', React.version);

const Enzyme = require('enzyme');

const Adapter = require('@wojtekmaj/enzyme-adapter-react-17'); //require('enzyme-adapter-react-16');
Enzyme.configure({ adapter: new Adapter() });
