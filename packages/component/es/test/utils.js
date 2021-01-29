import MockDate from 'mockdate';
export function setMockDate() {
  var dateString =
    arguments.length > 0 && arguments[0] !== undefined
      ? arguments[0]
      : '2017-09-18T03:30:07.795';
  MockDate.set(dateString);
}
export function resetMockDate() {
  MockDate.reset();
}
