export const serviceTypes = {
  packing: '00000000-0000-0000-0000-000000000001',
  unpacking: '00000000-0000-0000-0000-000000000002',
};

export const handlingPorts = {
  psa: '00000000-0000-0000-0000-000000000001',
  jpjw: '00000000-0000-0000-0000-000000000002',
};

export const shipmentTypes = {
  local: '00000000-0000-0000-0000-000000000001',
  transhipment: '00000000-0000-0000-0000-000000000002',
};

export const containerSizes = {
  twentyInch: '00000000-0000-0000-0000-000000000001',
  fortyInch: '00000000-0000-0000-0000-000000000002',
  fortyFiveInch: '00000000-0000-0000-0000-000000000003',
};

export const containerTypes = {
  GP: '00000000-0000-0000-0000-000000000001',
  FR: '00000000-0000-0000-0000-000000000002',
  TK: '00000000-0000-0000-0000-000000000003',
  HC: '00000000-0000-0000-0000-000000000004',
  OT: '00000000-0000-0000-0000-000000000005',
  RF: '00000000-0000-0000-0000-000000000006',
};

export const taskActionType = {
  containerIMG: '00000000-0000-0000-0000-000000000001',
  cargoIMG: '00000000-0000-0000-0000-000000000002',
  cargoAck: '00000000-0000-0000-0000-000000000003',
  forkliftJob: '00000000-0000-0000-0000-000000000004',
  tallyJob: '00000000-0000-0000-0000-000000000005',
  lotAllocationAck: '00000000-0000-0000-0000-000000000006',
  formOwnershipTranfer: '00000000-0000-0000-0000-000000000007',
  cargoOwnershipTransfer: '00000000-0000-0000-0000-000000000008',
  cargoAttention: '00000000-0000-0000-0000-000000000009',
};

export const taskActionButtonText = {
  '00000000-0000-0000-0000-000000000001': 'Approve',
  '00000000-0000-0000-0000-000000000002': 'Approve',
  '00000000-0000-0000-0000-000000000003': 'View Changes',
  '00000000-0000-0000-0000-000000000004': 'Approve',
  '00000000-0000-0000-0000-000000000005': 'Approve',
  '00000000-0000-0000-0000-000000000006': 'Approve',
  '00000000-0000-0000-0000-000000000007': 'Approve',
  '00000000-0000-0000-0000-000000000008': 'Approve',
  '00000000-0000-0000-0000-000000000009': 'Make Changes',
};

export const lotType = {
  export: '00000000-0000-0000-0000-000000000001',
  tShipment: '00000000-0000-0000-0000-000000000002',
  import: '00000000-0000-0000-0000-000000000003',
  small: '00000000-0000-0000-0000-000000000004',
};

export const storageType = {
  mod1: '00000000-0000-0000-0000-000000000001',
  mod2: '00000000-0000-0000-0000-000000000002',
  mod3: '00000000-0000-0000-0000-000000000003',
  mod4: '00000000-0000-0000-0000-000000000004',
  mod5: '00000000-0000-0000-0000-000000000005',
  mod6: '00000000-0000-0000-0000-000000000006',
};

export const tenant = {
  psa: '00000000-0000-0000-0000-000000000001',
};
export const role = {
  tenantTally: '00000000-0000-0000-0000-000000000010',
};
export const port = {
  sgsin: '00000000-0000-0000-0000-000000006424',
};

export const monitoringRemarks = {
  ok: 'Ok',
};

export const applicationStatuses = {
  draft: 'Draft',
  submitted: 'Submitted',
  rejected: 'Rejected',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export const fumigationFormStatuses = {
  draft: 'Draft',
  submitted: 'Submitted',
  rejected: 'Rejected',
  completed: 'Completed',
  cancelled: 'Cancelled',
  inprogress: 'In-Progress',
};

export const kdCargoFormStatuses = {
  draft: 'Draft',
  submitted: 'Submitted',
};

export const kdCargoActionType = {
  createByUI: 'CreateByUI',
};

export const taskStatus = {
  pending: 'Pending',
  completed: 'Completed',
  approved: 'Approved',
  rejected: 'Rejected',
  cancelled: 'Cancelled',
};

export const storageLayoutStatus = {
  vaccant: 'Vaccant',
  occupied: 'Occupied',
};

export const JOB_STATUS = {
  New: 'New',
  Pending: 'Pending',
  InProgress: 'In Progress',
  Completed: 'Completed',
};

export const JOB_ATTACHMENT = {
  ContainerImg: 'ContainerImg',
  IncSealImg: 'IncSealImg',
  OutgSealImg: 'OutgSealImg',
  Exception: 'Exception',
  Label: 'Label',
};

export const JOB_TYPE = {
  Stuffing: 'Stuffing',
  Unstuffing: 'Unstuffing',
  Receiving: 'Receiving',
  Releasing: 'Releasing',
};

export const CONTAINER_PRIORITY = {
  HIGH: { text: 'HIGH', value: 0 },
  MEDIUM: { text: 'MEDIUM', value: 1 },
  LOW: { text: 'LOW', value: 2 },
};

export const handlingTypes = {
  PERMITTED: '00000000-0000-0000-0000-000000000001',
  NOTPERMITTED: '00000000-0000-0000-0000-000000000002',
  KDHANDLING: '00000000-0000-0000-0000-000000000003',
  KDHANDLING_CA: '00000000-0000-0000-0000-000000000004',
  J5DIRECTHANDLING: '00000000-0000-0000-0000-000000000005',
};
