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
  dataLoader: ({ code, ...props }: { code: string }) => Promise<[]>;
}

let localStore: StateProps = {
  loading: {},
  dataSource: {},
};

let imt_current = immutable.fromJS(localStore);

class MIConfig {
  static dataLoader = undefined;

  static config({ dataLoader }: MedisysConfigProps) {
    //@ts-ignore
    if (dataLoader) this.dataLoader = dataLoader;
  }

  static async loadData(code: string, params?: any) {
    console.log(code);
    if (!this.dataLoader) {
      throw 'No default loader configed, please use `config` function set default dataLoader';
    }

    //@ts-ignore
    const data = await this.dataLoader({ code, ...params });
    console.log(data);
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
    const imt_data = immutable.fromJS(newState) as Map<string, any>;
    if (loading && imt_data.get('loading') !== imt_current.get('loading')) {
      // console.log(loading);
      console.log('loading state changed', loading, localStore.loading);
      document.dispatchEvent(
        new CustomEvent('loadingstatechanged', {
          bubbles: true,
          detail: loading,
        }),
      );
    }
    if (
      dataSource &&
      immutable.getIn(imt_data, ['dataSource'], Map()) !==
        immutable.getIn(imt_current, ['dataSource'], Map())
    ) {
      const imt_dataSource = imt_data.get('dataSource');

      imt_dataSource.keySeq().forEach((code: string) => {
        document.dispatchEvent(
          new CustomEvent('mi_datasourcechanged_' + code, {
            bubbles: true,
            detail: imt_dataSource.get(code).toJS(),
          }),
        );
        console.log(code);
      });
    }

    imt_current = immutable.merge(imt_current, imt_data);
  }
}

// const MIConfig = {
//   config: () => {},
//   loadData: () => {},
//   updateState: (newState: StateProps = {}) => {
//     const { loading, dataSource } = newState;
//     const imt_data = immutable.fromJS(newState) as Map<string, any>;
//     if (loading && imt_data.get('loading') !== imt_current.get('loading')) {
//       // console.log(loading);
//       console.log('loading state changed', loading, localStore.loading);
//       document.dispatchEvent(
//         new CustomEvent('loadingstatechanged', {
//           bubbles: true,
//           detail: loading,
//         }),
//       );
//     }
//     // console.log(
//     //   dataSource &&
//     //     immutable.getIn(imt_data, ['dataSource', 'users'], List()) !==
//     //       immutable.getIn(imt_current, ['dataSource', 'users'], List()),
//     //   immutable.getIn(imt_data, ['dataSource', 'users'], List()).toJS(),
//     //   immutable.getIn(imt_current, ['dataSource', 'users'], List()).toJS(),
//     // );
//     if (
//       dataSource &&
//       immutable.getIn(imt_data, ['dataSource'], Map()) !==
//         immutable.getIn(imt_current, ['dataSource'], Map())
//     ) {
//       const imt_dataSource = imt_data.get('dataSource');

//       imt_dataSource.keySeq().forEach((code: string) => {
//         document.dispatchEvent(
//           new CustomEvent('mi_datasourcechanged_' + code, {
//             bubbles: true,
//             detail: imt_dataSource.get(code).toJS(),
//           }),
//         );
//         console.log(code);
//       });
//     }

//     imt_current = immutable.merge(imt_current, imt_data);
//   },
//   test: 1,
// };

export default MIConfig;
