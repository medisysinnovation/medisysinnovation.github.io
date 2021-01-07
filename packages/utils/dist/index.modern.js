const getAbsPoint = id => {
  var _document$getElementB;

  return (_document$getElementB = document.getElementById(id)) == null ? void 0 : _document$getElementB.getBoundingClientRect();
};
const getMaxHeight = (screenHeight, id, bottomSpacing = 0, minHeight = undefined) => {
  const mainContentBottomMargin = 24;
  const pos = getAbsPoint(id);
  if (!screenHeight || !pos) return minHeight;

  if (pos) {
    const maxheight = screenHeight - pos.top - mainContentBottomMargin - bottomSpacing; // 24 is padding bottom

    if (maxheight) {
      return maxheight >= (minHeight != null ? minHeight : 0) ? maxheight : minHeight;
    }
  }

  return minHeight;
};

const dateTimeCompare = (a, b) => {
  if (!a) return -1;
  if (!b) return 1;
  return a.valueOf() - b.valueOf();
};

export { dateTimeCompare, getAbsPoint, getMaxHeight };
//# sourceMappingURL=index.modern.js.map
