export default interface StorageLayoutDto {
  storageId: string;
  storageName: string;
  storageCode: string;
  lotName: string;
  lotTypeId: string;
  lotNumber: string;
  status: string;
  isActive: boolean;
  id: string;
  isDeleted: boolean;
  recordVersion: string;
  isPlaceholder?: boolean;
}
