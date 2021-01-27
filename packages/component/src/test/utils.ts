import MockDate from 'mockdate';
import { act } from 'react-dom/test-utils';

export function setMockDate(dateString = '2017-09-18T03:30:07.795') {
  MockDate.set(dateString);
}

export function resetMockDate() {
  MockDate.reset();
}
