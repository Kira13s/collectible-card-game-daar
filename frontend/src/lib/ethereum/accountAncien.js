"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compact = void 0;
var compact = function (account) {
    var acc = account !== null && account !== void 0 ? account : '';
    var start = acc.slice(0, 7);
    var length = acc.length;
    var end = acc.slice(length - 5, length);
    return "".concat(start, "...").concat(end);
};
exports.compact = compact;
