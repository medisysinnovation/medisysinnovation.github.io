// @ts-nocheck
import {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory,
} from 'history-with-query';
// export { MemoryHistory, History as HWQHistory } from 'history-with-query';
let options = {
  basename: '/',
};
if ((<any>window).routerBase) {
  options.basename = (<any>window).routerBase;
}
// remove initial history because of ssr
// let history = process.env.__IS_SERVER ? null : createBrowserHistory(options);
let history = createBrowserHistory(options);

export const createHistory = (hotReload = false) => {
  if (!hotReload) {
    history = createBrowserHistory(options);
  }

  return history;
};

export { history };
