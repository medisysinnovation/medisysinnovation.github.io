export interface CTSubRiskDto {
  id: string;
  isDeleted: boolean;
  recordVersion: string;

  unNoIMOClassId: string;
  imoClassId: string;
  riskLevel: number;
  isActive: boolean;
  sortOrder: number | null;
}
