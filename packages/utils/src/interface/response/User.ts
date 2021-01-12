import Tenant from "./Tenant";

export interface User {
  id: string;
  userName: string;
  name: string;
  email: string;
  contactNumber: string;
  psaAccountNumber: string;
  tenantId: string;
  managedTenantId: string;
  isActive: boolean;
  roles: UserRoles[];
}

export interface CurrentUserDto {
  isTenant: boolean;
  user: User;
  tenant: Tenant;
  accessRights: string[];
}

export interface UserRoles {
  name: string;
  normalizedName: string;
  isActive: boolean;
  description: string;
  id: string;
}
