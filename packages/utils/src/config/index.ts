import _ from 'lodash';
export { default as MIConfig } from './MIConfig';
export function defineConfig(config: Object) {
  return config;
}

export interface Network {
  endpoint: any;
}

export interface MIConfig {
  network: Network;
}
let config: MIConfig = {
  network: {
    endpoint: {},
  },
};

const initilaze = (_config: MIConfig) => {
  config = _.merge(config, _config);
};
// setInterval(() => {
//   console.log(config);
// }, 10000);

export { initilaze, config };
