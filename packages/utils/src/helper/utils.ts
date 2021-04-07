import { MIConfig } from '../config';

export type ValidKey = 'refreshToken' | 'accessToken';

export const getKey = (field: ValidKey) => {
  const key = MIConfig.getConfig('keys')[field];
  if (!key)
    throw field + ' not config, use `MIConfig.setConfig({keys:{...}})` to set';

  return key;
};
