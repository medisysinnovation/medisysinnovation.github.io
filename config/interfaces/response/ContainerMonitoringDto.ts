import ContainerInspectionDto from './ContainerInspectionDto';
import InspectionAttachmentDto from './InspectionAttachmentDto';

export interface YardLocationData {
  terminal: string;
  yardLocation: string;
  yardBlock?: string;
  startSlot?: string;
  endSlot?: string;
  row?: string;
}

export default interface ContainerMonitoringDto {
  containerYardId: string;
  containerNumber: string;
  terminal: string;
  yardLocation: string;
  level: string;
  priority: string;
  imoClass: string;
  loadTime: string;
  loadVslM: string;
  loadVoyN: string;
  discVslM: string;
  discVoyN: string;
  dischargeTime: string;
  arivTime: string;
  isSpecialDG: boolean;
  isInspected: boolean;
  isActive: boolean;
  containerInspection: ContainerInspectionDto[];
  inspectionAttachments: InspectionAttachmentDto[];
  id: string;
  isDeleted: boolean;
  recordVersion: string;
  createDate: string;
  dgGroup?: string;
  yardLocationData: YardLocationData;
  dwellTime: number;
  instructionTypeC: string;
}
