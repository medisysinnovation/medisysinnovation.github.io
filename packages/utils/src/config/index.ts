import _ from 'lodash';
export function defineConfig(config: Object) {
  return config;
}

export interface Network {
  endpoint: any;
}

export interface MedisysConfig {
  network: Network;
}
let config: MedisysConfig = {
  network: {
    endpoint: {},
  },
};

const initilaze = (_config: MedisysConfig) => {
  config = _.merge(config, _config);
};
// setInterval(() => {
//   console.log(config);
// }, 10000);

export { initilaze, config };
