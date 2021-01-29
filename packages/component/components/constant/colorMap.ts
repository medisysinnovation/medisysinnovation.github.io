import { lotType } from './codetableEnum';
export const primary = '#ffc069';
export const white = '#fff';
export const red = '#cf1322';
export const lightRed = '#ff4d4f';
export const darkRed = '#d44243';
export const green = '#95de64';
export const yellow = '#d4b106';
export const blue = '#096dd9';
export const lightBlue = '#91d5ff';
export const orange = '#d46b08';
export const grey = '#d2d2d2';

export const applicationStatusColorMap = {
  draft: primary,
  submitted: green,
  rejected: lightRed,
  completed: lightBlue,
  cancelled: darkRed,
};

export const kdCargoFormStatusColorMap = {
  draft: primary,
  submitted: green,
};

export const fumigationFormStatusColorMap = {
  draft: primary,
  submitted: green,
  rejected: lightRed,
  completed: lightBlue,
  cancelled: darkRed,
  inprogress: yellow,
};

export const lotStatusColorMap = {
  vacant: white,
  occupied: green,
  highlighted: primary,
  notAvailable: grey,
};

export const lotTypeColorMap = {
  [lotType.export]: red,
  [lotType.tShipment]: yellow,
  [lotType.import]: blue,
  [lotType.small]: orange,
};

export const jobStatusColorMapping = {
  new: '#ffec3d',
  pending: '#E5AC00',
  'in progress': '#E50000',
  completed: '#8098C5',
};

export const containerLotColorMap = {
  HIGH: red,
  MEDIUM: primary,
  LOW: grey,
};
