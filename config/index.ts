import endpoint from "./endpoint";
// import { MedisysConfig } from "./type";

// import { IConfig } from '@umijs/types';
// // @ts-ignore
// import { IConfigFromPlugins } from '@@/core/pluginConfig';

// IConfig types is prior to IConfigFromPlugins in the same key.
export function defineConfig(config) {
  return config;
}

export default defineConfig({
  network: {
    endpoint,
  },
});
