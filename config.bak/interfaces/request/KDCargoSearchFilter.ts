import { Moment } from 'moment';

export interface KDCargoSearchFilter {
  name?: string;
  serviceTypeIds?: string[];
  containerSizeIds?: string[];
  containerTypeIds?: string[];
  actualTimeOfBerthing?: Moment[];
  actualTimeOfBerthingStart?: string;
  actualTimeOfBerthingEnd?: string;
}
