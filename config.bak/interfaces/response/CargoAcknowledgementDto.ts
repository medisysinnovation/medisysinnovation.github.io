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
  isAcknowledged: boolean;
  acknowledgedByUserId: string;
  acknowledgedDate: Date;
  id: string;
  isDeleted: boolean;
  recordVersion: string;
  cargoMeasurements: CargoMeasurementDto[];
}
