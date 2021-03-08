import immutable from 'immutable';
// console.log(immutable);
const { Map, List } = immutable;
export interface ModalStaticFunctions {
  updateState: (newState: StateProps) => void;
  loadData: (code: string, params?: any) => Promise<[]>;
}
// type d = typeof {[key: string]: V}
export interface StateProps {
  loading?: Object;
  dataSource?: Object;
}

export interface MedisysConfigProps {
  dataLoader?: ({ code, ...props }: { code: string }) => Promise<[]>;
  urls?: { [key: string]: string };
  cache?: boolean;
}
const loadingStates: { [key: string]: boolean } = {};
let localStore: StateProps = {
  loading: {},
  dataSource: JSON.parse(sessionStorage.getItem('mi_ds') || '{}'),
};

const _me = {
  imt_current: immutable.fromJS(localStore),
};
const _confg: MedisysConfigProps = {
  cache: false,
  urls: {
    login: '/connect/token',
    codetable: '/api/CodeTable',
    currentUser: '/api/User/Current',
    changePassword: '/api/User/ChangePassword',
    user: '/api/user',
    role: '/api/role',
    tenant: '/api/tenant',
  },
  dataLoader: undefined,
};

class MIConfig {
  static config({ dataLoader, urls, cache }: MedisysConfigProps) {
    //@ts-ignore
    if (dataLoader) _confg.dataLoader = dataLoader;

    if (urls) {
      _confg.urls = { ..._confg.urls, ...urls };
    }

    _confg.cache = cache ?? true;
  }

  static initialization() {
    var ds = _me.imt_current.get('dataSource');

    ds.keySeq().forEach((code: string) => {
      // console.log(ds.get(code)?.toJS(), code);
      document.dispatchEvent(
        new CustomEvent('mi_datasourcechanged_' + code, {
          bubbles: true,
          detail: ds.get(code)?.toJS() ?? [],
        }),
      );
    });

    window.addEventListener('keydown', event => {
      if (event.ctrlKey && event.key === 'F5') {
        sessionStorage.removeItem('mi_ds');
        event.preventDefault();
        window.location.reload();
      }
    });
  }

  static getData(code: string) {
    if (!code) throw 'Must pass in `code`';

    const existingData = immutable.getIn(
      _me.imt_current,
      ['dataSource', code],
      undefined,
    );
    if (!existingData) return [];
    return existingData.toJS() as [];
  }

  static async loadData(code: string, params?: any) {
    // console.log(code, _confg.dataLoader);
    if (!_confg.dataLoader) {
      throw 'No default loader configed, please use `config` function set default dataLoader';
    }

    if (loadingStates[code]) {
      return;
    }
    loadingStates[code] = true;
    //@ts-ignore
    const data = await _confg.dataLoader({ code, ...params });
    delete loadingStates[code];
    if (data) {
      this.updateState({
        dataSource: {
          [code]: data,
        },
      });
    }

    return data;
  }

  static updateState(newState: StateProps = {}) {
    const { loading, dataSource } = newState;
    let imt_data = immutable.fromJS(newState) as Map<string, any>;
    if (loading && imt_data.get('loading') !== _me.imt_current.get('loading')) {
      // console.log(loading);
      // console.log('loading state changed', loading, localStore.loading);
      document.dispatchEvent(
        new CustomEvent('loadingstatechanged', {
          bubbles: true,
          detail: loading,
        }),
      );
    }
    const dataSourceChanged =
      immutable.getIn(imt_data, ['dataSource'], Map()) !==
      immutable.getIn(_me.imt_current, ['dataSource'], Map());
    // console.log(
    //   dataSourceChanged,
    //   immutable.getIn(imt_data, ['dataSource'], Map()).toJS(),
    //   immutable.getIn(this.imt_current, ['dataSource'], Map()).toJS(),
    //   immutable
    //     .merge(imt_data.get('dataSource'), this.imt_current.get('dataSource'))
    //     .toJS(),
    // );
    if (dataSource && dataSourceChanged) {
      let imt_dataSource = imt_data.get('dataSource');

      imt_dataSource.keySeq().forEach((code: string) => {
        document.dispatchEvent(
          new CustomEvent('mi_datasourcechanged_' + code, {
            bubbles: true,
            detail: imt_dataSource.get(code).toJS(),
          }),
        );
        // console.log(code);
      });

      imt_data = imt_data.set(
        'dataSource',
        immutable.merge(
          _me.imt_current.get('dataSource'),
          imt_data.get('dataSource'),
        ),
      );
    }

    _me.imt_current = immutable.merge(_me.imt_current, imt_data);
    // console.log(imt_current.toJS());
    if (_confg.cache && dataSourceChanged) {
      // console.log('set', imt_current.get('dataSource').toJS());
      sessionStorage.setItem(
        'mi_ds',
        JSON.stringify(_me.imt_current.get('dataSource').toJS()),
      );
    }
  }
}

setTimeout(() => {
  MIConfig.initialization();
}, 0);

export default MIConfig;
