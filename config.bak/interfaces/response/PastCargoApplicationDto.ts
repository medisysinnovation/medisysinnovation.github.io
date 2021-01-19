import CargoDetailsDto from './CargoDetailsDto';

export default interface PastApplicationCargoDto {
  serviceRefNumber: string;
  nameOfCompany: string;
  applicantPSAAccount: string;
  operationDateTime: Date;
  incomingSeal: string;
  outgoingSeal: string;
  tenantContactPerson: string;
  tenantContactNumber: string;
  tenantEmail: string;
  cargo: CargoDetailsDto;
  id: string;
  isDeleted: boolean;
  recordVersion: string;
}
