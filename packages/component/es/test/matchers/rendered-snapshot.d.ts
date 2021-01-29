/// <reference types="jest" />
import { ReactElement } from 'react';
export default function toMatchRenderedSnapshot(
  this: jest.MatcherUtils,
  jsx: ReactElement<unknown>,
): {
  message(): string;
  pass: boolean;
};
