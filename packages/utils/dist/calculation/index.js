"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaxHeight = exports.getAbsPoint = void 0;
var getAbsPoint = function (id) {
    var _a;
    return (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
};
exports.getAbsPoint = getAbsPoint;
var getMaxHeight = function (screenHeight, id, bottomSpacing, minHeight) {
    if (bottomSpacing === void 0) { bottomSpacing = 0; }
    if (minHeight === void 0) { minHeight = undefined; }
    var mainContentBottomMargin = 24;
    var pos = exports.getAbsPoint(id);
    if (!screenHeight || !pos)
        return minHeight;
    if (pos) {
        var maxheight = screenHeight - pos.top - mainContentBottomMargin - bottomSpacing; // 24 is padding bottom
        if (maxheight) {
            return maxheight >= (minHeight !== null && minHeight !== void 0 ? minHeight : 0) ? maxheight : minHeight;
        }
    }
    return minHeight;
};
exports.getMaxHeight = getMaxHeight;
