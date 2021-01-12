import { TenantHaulierDto } from "./TenantHaulierDto";

export default interface Tenant {
  tenantPSAAccountNumber: string;
  tenantName: string;
  tenantCode: string;
  tenantContactPerson: string;
  tenantContactNumber: string;
  tenantEmail: string;
  tenantFaxNumber: string;
  isActive: boolean;
  id: string;
  isDeleted: boolean;
  recordVersion: string;

  tenantHaulier: TenantHaulierDto[];
}
