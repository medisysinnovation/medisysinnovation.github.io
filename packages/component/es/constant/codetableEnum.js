export var serviceTypes = {
  packing: '00000000-0000-0000-0000-000000000001',
  unpacking: '00000000-0000-0000-0000-000000000002',
};
export var handlingPorts = {
  psa: '00000000-0000-0000-0000-000000000001',
  jpjw: '00000000-0000-0000-0000-000000000002',
};
export var shipmentTypes = {
  local: '00000000-0000-0000-0000-000000000001',
  transhipment: '00000000-0000-0000-0000-000000000002',
};
export var containerSizes = {
  twentyInch: '00000000-0000-0000-0000-000000000001',
  fortyInch: '00000000-0000-0000-0000-000000000002',
  fortyFiveInch: '00000000-0000-0000-0000-000000000003',
};
export var containerTypes = {
  GP: '00000000-0000-0000-0000-000000000001',
  FR: '00000000-0000-0000-0000-000000000002',
  TK: '00000000-0000-0000-0000-000000000003',
  HC: '00000000-0000-0000-0000-000000000004',
  OT: '00000000-0000-0000-0000-000000000005',
  RF: '00000000-0000-0000-0000-000000000006',
};
export var taskActionType = {
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
export var taskActionButtonText = {
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
export var lotType = {
  export: '00000000-0000-0000-0000-000000000001',
  tShipment: '00000000-0000-0000-0000-000000000002',
  import: '00000000-0000-0000-0000-000000000003',
  small: '00000000-0000-0000-0000-000000000004',
};
export var storageType = {
  mod1: '00000000-0000-0000-0000-000000000001',
  mod2: '00000000-0000-0000-0000-000000000002',
  mod3: '00000000-0000-0000-0000-000000000003',
  mod4: '00000000-0000-0000-0000-000000000004',
  mod5: '00000000-0000-0000-0000-000000000005',
  mod6: '00000000-0000-0000-0000-000000000006',
};
export var tenant = {
  psa: '00000000-0000-0000-0000-000000000001',
};
export var role = {
  tenantTally: '00000000-0000-0000-0000-000000000010',
};
export var port = {
  sgsin: '00000000-0000-0000-0000-000000006424',
};
export var monitoringRemarks = {
  ok: 'Ok',
};
export var applicationStatuses = {
  draft: 'Draft',
  submitted: 'Submitted',
  rejected: 'Rejected',
  completed: 'Completed',
  cancelled: 'Cancelled',
};
export var fumigationFormStatuses = {
  draft: 'Draft',
  submitted: 'Submitted',
  rejected: 'Rejected',
  completed: 'Completed',
  cancelled: 'Cancelled',
  inprogress: 'In-Progress',
};
export var kdCargoFormStatuses = {
  draft: 'Draft',
  submitted: 'Submitted',
};
export var kdCargoActionType = {
  createByUI: 'CreateByUI',
};
export var taskStatus = {
  pending: 'Pending',
  completed: 'Completed',
  approved: 'Approved',
  rejected: 'Rejected',
  cancelled: 'Cancelled',
};
export var storageLayoutStatus = {
  vaccant: 'Vaccant',
  occupied: 'Occupied',
};
export var JOB_STATUS = {
  New: 'New',
  Pending: 'Pending',
  InProgress: 'In Progress',
  Completed: 'Completed',
};
export var JOB_ATTACHMENT = {
  ContainerImg: 'ContainerImg',
  IncSealImg: 'IncSealImg',
  OutgSealImg: 'OutgSealImg',
  Exception: 'Exception',
  Label: 'Label',
};
export var JOB_TYPE = {
  Stuffing: 'Stuffing',
  Unstuffing: 'Unstuffing',
  Receiving: 'Receiving',
  Releasing: 'Releasing',
};
export var CONTAINER_PRIORITY = {
  HIGH: {
    text: 'HIGH',
    value: 0,
  },
  MEDIUM: {
    text: 'MEDIUM',
    value: 1,
  },
  LOW: {
    text: 'LOW',
    value: 2,
  },
};
export var handlingTypes = {
  PERMITTED: '00000000-0000-0000-0000-000000000001',
  NOTPERMITTED: '00000000-0000-0000-0000-000000000002',
  KDHANDLING: '00000000-0000-0000-0000-000000000003',
  KDHANDLING_CA: '00000000-0000-0000-0000-000000000004',
  J5DIRECTHANDLING: '00000000-0000-0000-0000-000000000005',
};
