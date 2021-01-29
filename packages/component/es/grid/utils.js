export { getMaxHeight } from '@medisys/utils';
export var getTotalString = function getTotalString(total, range) {
  return ''
    .concat(range[0], '-')
    .concat(range[1], ' of ')
    .concat(total, ' items');
};
