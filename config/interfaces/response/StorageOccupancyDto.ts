import StorageLayoutDto from './StorageLayoutDto';

export interface Cargo {
  serviceRefNumber: string;
  applicant: string;
  transferee: string;
  containerNumber: string;
  storingOrderNumber: string;
  markNumber: string;
  quantity: number;
  packingType: string;
  sortOrder: number;
  j5ApplicationFormId: string;
  id: string;
  isDeleted: boolean;
  recordVersion: string;
  cargoContents: string[];
  weight: number;
  volumeMetric: number;
}

export interface CargoStoringOrder {
  cargoId: string;
  cargoSOCounter: string;
  counter: number;
  cargo: Cargo;
  id: string;
  isDeleted: boolean;
  recordVersion: string;
}

export interface StorageOccupancyDto {
  cargoStoringOrderId: string;
  layoutId: string;
  storingState: string;
  cargoStoringOrder: CargoStoringOrder;
  id: string;
  isDeleted: boolean;
  recordVersion: string;
  layout: StorageLayoutDto;
}
