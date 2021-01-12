import { KDCargoDetailsDto } from './KDCargoDetailsDto';
import Tenant from './Tenant';

export interface KDCargoDto {
  tenantId: string;
  serviceTypeId: string;
  originId: string;
  dischargeId: string;
  destinationId: string;
  containerSizeId: string;
  containerTypeId: string;
  formStatus: string;
  kdCargoRefNumber: string;
  tenant: Tenant;
  kdCargoDetails: KDCargoDetailsDto[];
  id: string;
  isDeleted: boolean;
  recordVersion: string;

  actionType: string;
  actionDateTime: string;
  actionRedordRefId: string | null;
  submissionRefId: string;
  arrivalNoticeNumber: string;
  splitted: boolean;
  parentArrivalNoticeNumber: string;
  billOfLadingNumber: string;
  customsHouseBlNumber: string;
  cargoControlNumber: string;
  clientName: string;
  clientEmail: string;
  haulierName: string;
  haulierContactNumber: string;
  containerOperatorId: string;
  containerNumber: string;
  vesselName: string;
  voyageNumber: string;
  operationDateTime: string;
  estimateTimeOfBerthing: string;
  actualTimeOfBerthing: string;
  overLengthOrWeight: boolean;
  incomingSealNumber: string;
  outgoingSealNumber: string;
  containsDangerousGoods: boolean;
}
