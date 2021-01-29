import { render } from 'enzyme';
export default function toMatchRenderedSnapshot(jsx) {
  try {
    expect(render(jsx)).toMatchSnapshot();
    return {
      message: function message() {
        return 'expected JSX not to match snapshot';
      },
      pass: true,
    };
  } catch (e) {
    return {
      message: function message() {
        return 'expected JSX to match snapshot: '.concat(e.message);
      },
      pass: false,
    };
  }
}
