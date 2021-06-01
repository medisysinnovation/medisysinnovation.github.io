import type { HTMLAttributes } from 'react';

declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.svg';


declare module 'react' {
  interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean;
    key?:string;
    children?:any;
    onClick?:any;
  }
  interface HTMLAttributes<HTMLDivElement> extends HTMLDivElement<T> {
    ref?: any;
  }
}