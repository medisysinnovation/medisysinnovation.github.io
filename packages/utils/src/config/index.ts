import _ from "lodash";
export function defineConfig(config) {
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

export { initilaze, config };
