'use strict';

const authorization = require('..');
const { checkAuthority, setAuthority } = authorization;
// console.dir(authorization);
describe('authorization', () => {
  it('basic check test', () => {
    setAuthority(['demo.read']);

    expect(checkAuthority('demo.read')).toBeTruthy();
    expect(checkAuthority('demo.write')).toBeFalsy();
  });

  it('call time test', () => {
    const mockCheckAuthority = jest.fn(checkAuthority);

    mockCheckAuthority('demo.write');

    expect(mockCheckAuthority).toHaveBeenCalledTimes(1);
  });
});
