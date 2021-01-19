export interface Cargo {
  cargoId: string;
  jobId: string;
  jobStatus: string;
  jobType: string;
  attentionRequired: boolean;
  quantity: number;
  packingType: string;
  serviceRefNumber: string;
  psaPassNumber: string;
  transporterName: string;
  storingOrderNumber: string;
  markNumber: string;
  volumeMetric: number;
  weight: number;
  operationDateTime: Date;
}