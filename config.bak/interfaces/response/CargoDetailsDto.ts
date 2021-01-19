import { J5Job } from '@/pages/cargo-sap/components/application-form/data';
import CargoContentDto from './CargoContentDto';
import CargoMeasurementDto from './CargoMeasurementDto';
import StorageDto from './StorageDto';

export default interface CargoDetailsDto {
  storingOrderNumber: string;
  quantity: number;
  packingType: string;
  markNumber: string;
  weight: number;
  volumeMetric: number;
  shipmentTypeId: string;
  importSONumber: string;
  transporterPSAPassNumber: string;
  isCargoImageViewable: boolean;
  sortOrder: number;
  j5ApplicationFormId: string;
  destinationId: string;
  jobStatus: string;
  shipmentType: string;
  completeLotAllocationCount: number;
  imoClassId: string;
  cargoContents: CargoContentDto[];
  cargoMeasurements: CargoMeasurementDto[];
  j5Jobs: J5Job[];
  storage: StorageDto;
  version: number;
  isAcknowledged: boolean;
  isActive: boolean;
  id: string;
  isDeleted: boolean;
  recordVersion: string;
  notifyPartyEmail?: string,
  formStatus: string;
}
