const React = require('react');

// eslint-disable-next-line no-console
console.log('Current React Version:', React.version);

const Enzyme = require('enzyme');

const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });
