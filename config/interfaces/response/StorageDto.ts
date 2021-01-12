export default interface StorageDto {
  id: string;
  storageName: string;
  storageCode: string;
  isActive: boolean;
  isDeleted: boolean;
  recordVersion: string;
  createDate: string;
}
