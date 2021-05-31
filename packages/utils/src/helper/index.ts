import moment from 'moment';

// export * from './history';
export * from './download';

export * from './localStorage';
export * from './utils';


import type { LongDateFormatSpec } from 'moment';



type F = LongDateFormatSpec | string;
declare global {
  interface String {
    format: (
      f?: F,
      options?: {
        empty: string;
      },
    ) => string;

    date: () => Date;
  }
}

// eslint-disable-next-line no-extend-native
String.prototype.format = function format(f = 'LLL', { empty } = { empty: '-' }) {
  const m = moment(this as string);
  if (!m.isValid()) return empty;
  return m.format(f as string);
};

// eslint-disable-next-line no-extend-native
String.prototype.date = function format() {
  // @ts-ignore
  return new Date(this);
};
