
export default interface ContainerBillingReportListDto {
  serviceType: string | null | null;
  serviceRefNumber: string | null;
  jobStartDate: string | null;
  jobEndDate: string | null;
  nameOfCompany: string | null;
  containerNumber?: string | null;
  containerSize: string | null;
  distanceMeasured: string | null;
  repackingDistance?: string | null;
  repackingQty: string | null;
  isNoShow: boolean;
  tallyStaffBy: string | null;
  cargoPSAGroup: string | null;
  isChemistRequired: boolean;
  isPreShipInspRequired: boolean;
  isOTActivation: boolean;
  otHrs: number | null;
}
