import ContainerLocationDto from './ContainerLocationDto';

export default interface ContainerYardDto {
  terminalId: string;
  yardId: string;
  terminal: string;
  yardCode: string;
  blockName: string;
  row: string;
  slot: string;
  imoClass: string;
  isAccessible: boolean;
  isActive: boolean;
  id: string;
  isDeleted: boolean;
  recordVersion: string;
  containerLocation: ContainerLocationDto[];
}
