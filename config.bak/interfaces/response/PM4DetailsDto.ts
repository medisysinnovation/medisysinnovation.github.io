export default interface PM4DetailsDto {
  unNumberId: string;
  imoClassId: string;
  packingGroupId: string;
  unNoImoClassId: string;
  pM4Status: string;
  packingType: string;
  quantity: number;
  weight: number;
  properShippingName: string;
  technicalName?: string;
  mpaApprovalStatus: string;
  psaApprovalStatus: string;
  handlingTypeId: string;
  pM4PSAGroup: string;
  handlingType: string;
}
