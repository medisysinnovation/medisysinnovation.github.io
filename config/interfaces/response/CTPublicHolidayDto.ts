export default interface CTPublicHolidayDto {
  id: string;
  isDeleted: boolean;
  isActive: boolean;
  recordVersion: string;
  code: string;
  displayValue: string;
  dateFrom: string;
  dateTo: string;
  dateRange?: [string, string];
}
