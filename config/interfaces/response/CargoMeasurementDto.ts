export default interface CargoMeasurementDto {
  cargoId?: string;
  length: number | null;
  width: number | null;
  height: number | null;
  quantity: number | null;
  id?: string;
  isDeleted?: boolean;
  recordVersion?: string;
}
