import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';

var _lotTypeColorMap;

import { lotType } from './codetableEnum';
export var primary = '#ffc069';
export var white = '#fff';
export var red = '#cf1322';
export var lightRed = '#ff4d4f';
export var darkRed = '#d44243';
export var green = '#95de64';
export var yellow = '#d4b106';
export var blue = '#096dd9';
export var lightBlue = '#91d5ff';
export var orange = '#d46b08';
export var grey = '#d2d2d2';
export var applicationStatusColorMap = {
  draft: primary,
  submitted: green,
  rejected: lightRed,
  completed: lightBlue,
  cancelled: darkRed,
};
export var kdCargoFormStatusColorMap = {
  draft: primary,
  submitted: green,
};
export var fumigationFormStatusColorMap = {
  draft: primary,
  submitted: green,
  rejected: lightRed,
  completed: lightBlue,
  cancelled: darkRed,
  inprogress: yellow,
};
export var lotStatusColorMap = {
  vacant: white,
  occupied: green,
  highlighted: primary,
  notAvailable: grey,
};
export var lotTypeColorMap =
  ((_lotTypeColorMap = {}),
  _defineProperty(_lotTypeColorMap, lotType['export'], red),
  _defineProperty(_lotTypeColorMap, lotType.tShipment, yellow),
  _defineProperty(_lotTypeColorMap, lotType['import'], blue),
  _defineProperty(_lotTypeColorMap, lotType.small, orange),
  _lotTypeColorMap);
export var jobStatusColorMapping = {
  new: '#ffec3d',
  pending: '#E5AC00',
  'in progress': '#E50000',
  completed: '#8098C5',
};
export var containerLotColorMap = {
  HIGH: red,
  MEDIUM: primary,
  LOW: grey,
};
