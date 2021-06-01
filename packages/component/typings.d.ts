import type { HTMLAttributes } from 'react';

declare module '*.css';
declare module '*.less';

declare namespace jest {
  interface Matchers<R> {
    toMatchRenderedSnapshot(): R;
  }
}

declare module 'react' {
  interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean;
    key?:string;
    children?:any;
    onClick?:any;
    style?:any
  }
  interface HTMLAttributes<HTMLDivElement> extends HTMLDivElement<T> {
    ref?: any;
  }
}