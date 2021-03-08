import immutable from 'immutable';
console.log(immutable);
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
}

let localStore: StateProps = {
  loading: {},
  dataSource: JSON.parse(sessionStorage.getItem('mi_ds') || '{}'),
};

class MIConfig {
  static dataLoader = undefined;
  static urls = {
    login: '/connect/token',
    codetable: '/api/CodeTable',
    currentUser: '/api/User/Current',
    changePassword: '/api/User/ChangePassword',
    user: '/api/user',
    role: '/api/role',
    tenant: '/api/tenant',
  };
  static imt_current = immutable.fromJS(localStore);

  static config({ dataLoader, urls }: MedisysConfigProps) {
    //@ts-ignore
    if (dataLoader) this.dataLoader = dataLoader;

    if (urls) {
      this.urls = { ...this.urls, ...urls };
    }
  }

  static initialization() {
    var ds = this.imt_current.get('dataSource');

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
    return immutable.getIn(this.imt_current, ['dataSource', code], []).toJS();
  }

  static async loadData(code: string, params?: any) {
    // console.log(code);
    if (!this.dataLoader) {
      throw 'No default loader configed, please use `config` function set default dataLoader';
    }

    //@ts-ignore
    const data = await this.dataLoader({ code, ...params });
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
    if (
      loading &&
      imt_data.get('loading') !== this.imt_current.get('loading')
    ) {
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
      immutable.getIn(this.imt_current, ['dataSource'], Map());
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
          this.imt_current.get('dataSource'),
          imt_data.get('dataSource'),
        ),
      );
    }

    this.imt_current = immutable.merge(this.imt_current, imt_data);
    // console.log(imt_current.toJS());
    if (dataSourceChanged) {
      // console.log('set', imt_current.get('dataSource').toJS());
      sessionStorage.setItem(
        'mi_ds',
        JSON.stringify(this.imt_current.get('dataSource').toJS()),
      );
    }
  }
}

setTimeout(() => {
  MIConfig.initialization();
}, 0);

export default MIConfig;
