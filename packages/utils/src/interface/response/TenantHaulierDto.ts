export interface TenantHaulierDto {
  id: string;
  isDeleted: boolean;
  recordVersion: string;

  tenantId: string;
  haulierName: string;
  haulierContactNumber: string;
}
