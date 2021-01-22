import React from 'react';
import { mount, render } from 'enzyme';
import mountTest from '../../../test/shared/mountTest';
import Button from '..';
import { SizeType } from '../../config';

describe('Button', () => {
  mountTest(Button);
  it('renders correctly', () => {
    expect(<Button>Follow</Button>).toMatchRenderedSnapshot();
  });
  it('mount correctly', () => {
    expect(() => mount(<Button>Follow</Button>)).not.toThrow();
  });
  it('warns if size is wrong', () => {
    const mockWarn = jest.fn();
    jest.spyOn(console, 'warn').mockImplementation(mockWarn);
    const size = ('who am I' as any) as SizeType;
    render(<Button.Group size={size} />);
    expect(mockWarn).toHaveBeenCalledTimes(1);
    expect(mockWarn.mock.calls[0][0]).toMatchObject({
      message: 'unreachable case: "who am I"',
    });
  });
});
