import { MIConfig } from '../config';
import moment from 'moment';

export type ValidKey = 'refreshToken' | 'accessToken';

export const getKey = (field: ValidKey) => {
  const key = MIConfig.getConfig('keys')[field];
  if (!key)
    throw field + ' not config, use `MIConfig.setConfig({keys:{...}})` to set';

  return key;
};

export const uniqueid = () => {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    // eslint-disable-next-line no-bitwise
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    // eslint-disable-next-line no-bitwise
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};

export const isObject = (objValue: any) => {
  return (
    objValue && typeof objValue === 'object' && objValue.constructor === Object
  );
};

export const omitUndefined = <T extends { [key: number]: any }>(
  obj: T,
  options: {
    allowEmpty?: boolean;
    autoTrim?: boolean;
  } = {},
): T => {
  const { allowEmpty = true, autoTrim = true } = options;
  const newObj = {} as T;
  Object.keys(obj || {}).forEach((key: any) => {
    if (typeof obj[key] === 'string' && autoTrim) {
      newObj[key] = obj[key].trim();
    } else if (isObject(obj[key])) {
      newObj[key] = omitUndefined(obj[key], options);
    } else {
      newObj[key] = obj[key];
    }
  });
  if (Object.keys(newObj).length < 1) {
    return allowEmpty ? obj : (undefined as any);
  }
  return newObj;
};

export const convertToAPIObject = (values: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(values).map(o => {
      if (Array.isArray(o[1])) return [o[0], o[1].join(',')];
      return o;
    }),
  );
};

export const defaultFormat = 'YYYY-MM-DD HH:mm';

export const isNil = (value: any) => value === null || value === undefined;

type DateValue =
  | moment.Moment
  | moment.Moment[]
  | string
  | string[]
  | number
  | number[];

export const parseValueToMoment = (
  value: DateValue,
  formatter?: string,
): moment.Moment | moment.Moment[] | null | undefined => {
  if (isNil(value) || moment.isMoment(value)) {
    return value as moment.Moment | null | undefined;
  }
  if (Array.isArray(value)) {
    return (value as any[]).map(
      v => parseValueToMoment(v, formatter) as moment.Moment,
    );
  }
  return moment(value, formatter);
};
