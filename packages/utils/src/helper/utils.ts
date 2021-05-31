import { MIConfig } from '../config';

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

export const removeEmpty = (values: Record<string, any>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return Object.fromEntries(
    Object.entries(values).filter(([_, v]) => v !== '' && v.length !== 0),
  );
};

export const convertToAPIObject = (values: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(values).map(o => {
      if (Array.isArray(o[1])) return [o[0], o[1].join(',')];
      return o;
    }),
  );
};
