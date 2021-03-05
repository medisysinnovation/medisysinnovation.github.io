export interface ConfigParamter {
  loader: (code: string) => void;
}

let _loader: Function = () => {};
const _config: ConfigParamter & any = {
  load: ({ code }: { code: string } = { code: '' }) => {
    console.log('load' + code);
    _loader({ code });
  },
};

_config.loader = (payload: ConfigParamter) => {
  _loader = payload.loader;
};
export default _config;
