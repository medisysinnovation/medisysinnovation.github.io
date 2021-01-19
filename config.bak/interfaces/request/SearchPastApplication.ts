import { Sorting } from '@/constants/pager';

export default interface SearchPastApplication {
  storingOrderOrMarkNumber?: string;
  packingType?: string[];
  sorting?: Sorting[];
}
