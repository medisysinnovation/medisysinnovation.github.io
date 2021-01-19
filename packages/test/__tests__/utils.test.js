'use strict';
import { bcd } from '../src';

describe('Sample test case: ', () => {
  test(' test case 1', () => {
    const r = bcd();
    expect(r).toEqual(1);
  });

  // test(' test case 2', () => {
  //   const r = bcd();
  //   expect(r).toEqual(2);
  // });
});
