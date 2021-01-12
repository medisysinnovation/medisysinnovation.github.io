import CargoContentDto from '@/interfaces/response/CargoContentDto';
import CargoMeasurementDto from '@/interfaces/response/CargoMeasurementDto';

export default interface CargoAcknowledgementDto {
  j5ApplicationFormId: string;
  cargoId: string;
  quantity: number;
  packingType: string;
  markNumber: string;
  imoClassId: string;
  unNoId: string;
  properShippingName: string;
  technicalName: string;
  packingGroupId: string;
  weight: number;
  volumeMetric: number;
  id: string;
  isDeleted: boolean;
  recordVersion: string;
  cargoMeasurements: CargoMeasurementDto[];
  cargoContents: CargoContentDto[];
}
