import PM4DetailsDto from '@/interfaces/response/PM4DetailsDto';

export default interface PM4StatusDto {
  message: string;
  pM4Details: PM4DetailsDto[];
  berthingSchedule: any;
}
