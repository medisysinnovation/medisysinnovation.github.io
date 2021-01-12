import CargoDetailsDto from './CargoDetailsDto';
import AttachmentDto from './AttachmentDto';
import CargoAcknowledgementDto from './CargoAcknowledgementDto';

export interface ApplicationFormDto {
  serviceRefNumber: string | null | null;
  applicantName: string | null;
  applicantEmail: string | null;
  applicantContactNumber: string | null;
  applicantPSAAccount: string | null;
  nameOfCompany: string | null;
  haulierName?: string | null;
  haulierContactNumber?: string | null;
  serviceTypeId: string | null;
  originId: string | null;
  destinationId: string | null;
  estimateTimeOfBerthing: Date | string | null;
  containerOperator?: string | null;
  containerNumber?: string | null;
  containerSizeId: string | null;
  overLengthOrWeight: boolean;
  handlingPortId: string | null;
  vesselName: string | null;
  voyageNumber: string | null;
  operationDateTime: Date | string | null;
  incomingSealNumber: string | null;
  outgoingSealNumber?: string | null;
  j5ApplicationStatus: string | null;
  isContainerImageViewable: boolean;
  remarks?: string | null;
  tenantId: string | null;
  version: number;
  isActive?: boolean;
  cargoDetails: CargoDetailsDto[];
  attachments: AttachmentDto[];
  cargoAcknowledgements: CargoAcknowledgementDto[];
  id?: number;
  isDeleted: boolean;
}
