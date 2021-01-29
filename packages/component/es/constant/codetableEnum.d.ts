export declare const serviceTypes: {
  packing: string;
  unpacking: string;
};
export declare const handlingPorts: {
  psa: string;
  jpjw: string;
};
export declare const shipmentTypes: {
  local: string;
  transhipment: string;
};
export declare const containerSizes: {
  twentyInch: string;
  fortyInch: string;
  fortyFiveInch: string;
};
export declare const containerTypes: {
  GP: string;
  FR: string;
  TK: string;
  HC: string;
  OT: string;
  RF: string;
};
export declare const taskActionType: {
  containerIMG: string;
  cargoIMG: string;
  cargoAck: string;
  forkliftJob: string;
  tallyJob: string;
  lotAllocationAck: string;
  formOwnershipTranfer: string;
  cargoOwnershipTransfer: string;
  cargoAttention: string;
};
export declare const taskActionButtonText: {
  '00000000-0000-0000-0000-000000000001': string;
  '00000000-0000-0000-0000-000000000002': string;
  '00000000-0000-0000-0000-000000000003': string;
  '00000000-0000-0000-0000-000000000004': string;
  '00000000-0000-0000-0000-000000000005': string;
  '00000000-0000-0000-0000-000000000006': string;
  '00000000-0000-0000-0000-000000000007': string;
  '00000000-0000-0000-0000-000000000008': string;
  '00000000-0000-0000-0000-000000000009': string;
};
export declare const lotType: {
  export: string;
  tShipment: string;
  import: string;
  small: string;
};
export declare const storageType: {
  mod1: string;
  mod2: string;
  mod3: string;
  mod4: string;
  mod5: string;
  mod6: string;
};
export declare const tenant: {
  psa: string;
};
export declare const role: {
  tenantTally: string;
};
export declare const port: {
  sgsin: string;
};
export declare const monitoringRemarks: {
  ok: string;
};
export declare const applicationStatuses: {
  draft: string;
  submitted: string;
  rejected: string;
  completed: string;
  cancelled: string;
};
export declare const fumigationFormStatuses: {
  draft: string;
  submitted: string;
  rejected: string;
  completed: string;
  cancelled: string;
  inprogress: string;
};
export declare const kdCargoFormStatuses: {
  draft: string;
  submitted: string;
};
export declare const kdCargoActionType: {
  createByUI: string;
};
export declare const taskStatus: {
  pending: string;
  completed: string;
  approved: string;
  rejected: string;
  cancelled: string;
};
export declare const storageLayoutStatus: {
  vaccant: string;
  occupied: string;
};
export declare const JOB_STATUS: {
  New: string;
  Pending: string;
  InProgress: string;
  Completed: string;
};
export declare const JOB_ATTACHMENT: {
  ContainerImg: string;
  IncSealImg: string;
  OutgSealImg: string;
  Exception: string;
  Label: string;
};
export declare const JOB_TYPE: {
  Stuffing: string;
  Unstuffing: string;
  Receiving: string;
  Releasing: string;
};
export declare const CONTAINER_PRIORITY: {
  HIGH: {
    text: string;
    value: number;
  };
  MEDIUM: {
    text: string;
    value: number;
  };
  LOW: {
    text: string;
    value: number;
  };
};
export declare const handlingTypes: {
  PERMITTED: string;
  NOTPERMITTED: string;
  KDHANDLING: string;
  KDHANDLING_CA: string;
  J5DIRECTHANDLING: string;
};
