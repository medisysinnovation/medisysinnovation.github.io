export interface ModalStaticFunctions {
  updateState: any;
}
export interface StateProps {
  loading: Object;
}

let localStore = {};

const global = {
  updateState: (newState: StateProps) => {
    localStore = newState;
    const { loading } = newState;
    // console.log(loading);
    document.dispatchEvent(
      new CustomEvent('loadingstatechanged', {
        bubbles: true,
        detail: loading,
      }),
    );
  },
};

export default global;
