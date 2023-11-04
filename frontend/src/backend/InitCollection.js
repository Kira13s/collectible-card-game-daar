"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadCollection = void 0;
var fs = require("fs");
var readline = require("readline");
var constants_js_1 = require("./constants.js");
var App_1 = require("../App");
function loadCollection() {
    return __awaiter(this, void 0, void 0, function () {
        var wallet, mainContract_1, sets;
        var _this = this;
        return __generator(this, function (_a) {
            wallet = (0, App_1.useWallet)();
            if (wallet != undefined) {
                mainContract_1 = wallet === null || wallet === void 0 ? void 0 : wallet.contract;
                sets = constants_js_1.dataPath + "sets.json";
                fetch(sets)
                    .then(function (response) { return response.json(); })
                    .then(function (data) { return __awaiter(_this, void 0, void 0, function () {
                    var _loop_1, _i, data_1, obj;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(data.length > 0)) return [3 /*break*/, 5];
                                _loop_1 = function (obj) {
                                    var name_1, cardCount, transaction, fileStream, rl;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                name_1 = obj.name;
                                                cardCount = obj.total;
                                                return [4 /*yield*/, mainContract_1.createCollection(name_1, cardCount)];
                                            case 1:
                                                transaction = _b.sent();
                                                return [4 /*yield*/, transaction.wait()];
                                            case 2:
                                                _b.sent();
                                                fileStream = fs.createReadStream(data + name_1 + 'CardsId.txt');
                                                rl = readline.createInterface({
                                                    input: fileStream,
                                                    crlfDelay: Infinity
                                                });
                                                rl.on('line', function (line) {
                                                    fetch('${data}/${name}/${line}.json')
                                                        .then(function (response) { return response.json(); })
                                                        .then(function (card) { return __awaiter(_this, void 0, void 0, function () {
                                                        var transaction;
                                                        return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0: return [4 /*yield*/, mainContract_1.AddCardToCollection(name_1, card.id, '${data}/${name}/${line}.json')];
                                                                case 1:
                                                                    transaction = _a.sent();
                                                                    return [4 /*yield*/, transaction.wait()];
                                                                case 2:
                                                                    _a.sent();
                                                                    return [2 /*return*/];
                                                            }
                                                        });
                                                    }); });
                                                });
                                                rl.on('close', function () { });
                                                return [2 /*return*/];
                                        }
                                    });
                                };
                                _i = 0, data_1 = data;
                                _a.label = 1;
                            case 1:
                                if (!(_i < data_1.length)) return [3 /*break*/, 4];
                                obj = data_1[_i];
                                return [5 /*yield**/, _loop_1(obj)];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                _i++;
                                return [3 /*break*/, 1];
                            case 4: return [3 /*break*/, 6];
                            case 5:
                                console.log('Aucun objet JSON trouvé.');
                                _a.label = 6;
                            case 6: return [2 /*return*/];
                        }
                    });
                }); });
            }
            return [2 /*return*/];
        });
    });
}
exports.loadCollection = loadCollection;
