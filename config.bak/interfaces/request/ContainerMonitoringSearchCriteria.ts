import { Pager } from '@/constants/pager';

export default interface ContainerMonitoringSearchCriteria extends Partial<Pager> {
  containerNumber?: string;
}
