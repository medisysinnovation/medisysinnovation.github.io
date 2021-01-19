export interface J5JobListingDto {
  jobStatus: string;
  serviceRefNumber: string;
  psaAccountNumber: string;
  jobRefNumber: string;
  operationDateTime: string;
  applicantName: string;
  containerNumber: string;
  jobType: string;
  originId: string;
  destinationId: string;
  attentionRequired: boolean;
  id: string;
  isDeleted: boolean;
  recordVersion: string;
  nextJob: string;
}
