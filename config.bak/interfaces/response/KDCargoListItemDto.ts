export interface KDCargoListItemDto {
  id: string | number;
  clientName: string;
  containerNumber: string;
  serviceTypeId: string;
  destinationId: string;
  dischargeId: string;
  containerSizeId: string;
  containerTypeId: string;
  actualTimeOfBerthing: string;
  vesselName: string;
  incomingSealNumber: string;
  outgoingSealNumber?: string;
  submissionRefId: string;
  formStatus: string;
  kdCargoRefNumber: string;
}