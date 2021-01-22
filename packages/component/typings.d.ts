declare module '*.css';
declare module '*.less';

declare namespace jest {
  interface Matchers<R> {
    toMatchRenderedSnapshot(): R;
  }
}
