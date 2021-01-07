var getAbsPoint = function getAbsPoint(id) {
  var _document$getElementB;

  return (_document$getElementB = document.getElementById(id)) == null ? void 0 : _document$getElementB.getBoundingClientRect();
};
var getMaxHeight = function getMaxHeight(screenHeight, id, bottomSpacing, minHeight) {
  if (bottomSpacing === void 0) {
    bottomSpacing = 0;
  }

  if (minHeight === void 0) {
    minHeight = undefined;
  }

  var mainContentBottomMargin = 24;
  var pos = getAbsPoint(id);
  if (!screenHeight || !pos) return minHeight;

  if (pos) {
    var maxheight = screenHeight - pos.top - mainContentBottomMargin - bottomSpacing; // 24 is padding bottom

    if (maxheight) {
      var _minHeight;

      return maxheight >= ((_minHeight = minHeight) != null ? _minHeight : 0) ? maxheight : minHeight;
    }
  }

  return minHeight;
};

var dateTimeCompare = function dateTimeCompare(a, b) {
  if (!a) return -1;
  if (!b) return 1;
  return a.valueOf() - b.valueOf();
};

exports.dateTimeCompare = dateTimeCompare;
exports.getAbsPoint = getAbsPoint;
exports.getMaxHeight = getMaxHeight;
//# sourceMappingURL=index.js.map
