import { CTSubRiskDto } from './CTSubRiskDto';

export interface UNNoIMOClassDto {
  id: string;
  isDeleted: boolean;
  recordVersion: string;

  unNoId: string;
  imoClassId: string;
  properShippingName: string;
  technicalName: string;
  fpFrom: string;
  fpTo: string;
  packingGroupId: string;
  psaGroupId: string;
  handlingTypeId: string;
  subRisk1IMOClassId: string;
  subRisk2IMOClassId: string;
  unNoCode: string;
  unNoDisplayValue: string;
  isActive: boolean;
  imoClassDisplayValue: string;
  subRisk1DisplayValue: string;
  subRisk2DisplayValue: string;
  packingGroupDisplayValue: string;
  psaGroupDisplayValue: string;

  subRisk: CTSubRiskDto[];
}
