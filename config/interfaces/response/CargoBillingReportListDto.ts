
export default interface CargoBillingReportListDto {
  serviceType: string | null | null;
  storingOrderNumber: string | null;
  importSONumber: string | null;
  nameOfCompany: string | null;
  weight: number | null;
  volume: number | null;
  quantity: number | null;
  unpackingDate: string | null;
  releasingDate: string | null;
  receivingDate: string | null;
  packingDate: string | null;
  dwellDays: string | null;
  labellingSvc: number | null;
  isOTActivation: boolean;
  otHrs: number | null;
  isForkliftCharges: boolean;
  isDirectHandling: boolean;
}
