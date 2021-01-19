import { KDCargoContentDto } from './KDCargoContentDto';
import { KDCargoMeasurementDto } from './KDCargoMeasurementDto';

export interface KDCargoDetailsDto {
  kdCargoId: string;
  shipmentTypeId: string;
  destinationId: string;
  kdCargoContent: KDCargoContentDto[];
  kdCargoMeasurement: KDCargoMeasurementDto[];
  id: string;
  isDeleted: boolean;
  recordVersion: string;

  quantity: number;
  packingType: string;
  markNumber: string;
  weight: number;
  height: number;
  importSONumber: string;
  isDangerousGoods: boolean;

  tempId: string;
}
