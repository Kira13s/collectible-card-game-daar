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
exports.buyBooster = void 0;
var ethers_1 = require("ethers");
var react_1 = require("react");
var ethereum = require("../lib/ethereum");
var main = require("../lib/main");
//import { useWallet } from '@/App'
function buyBooster(name) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                    var wallet, provider, account_1, contract_1;
                    var _this = this;
                    return __generator(this, function (_a) {
                        try {
                            wallet = useWallet();
                            if (wallet) {
                                provider = wallet.details.provider;
                                account_1 = wallet.details.account;
                                contract_1 = wallet.contract;
                                if (account_1 && contract_1) {
                                    provider
                                        .getBalance(account_1)
                                        .then(function (balance) { return __awaiter(_this, void 0, void 0, function () {
                                        var balanceInEther, cost, transaction;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    balanceInEther = ethers_1.ethers.utils.formatEther(balance);
                                                    return [4 /*yield*/, contract_1.getCostBooster(name)];
                                                case 1:
                                                    cost = _a.sent();
                                                    return [4 /*yield*/, cost.wait()];
                                                case 2:
                                                    _a.sent();
                                                    if (!(balanceInEther >= cost)) return [3 /*break*/, 5];
                                                    return [4 /*yield*/, contract_1.buyBooster(account_1, name)];
                                                case 3:
                                                    transaction = _a.sent();
                                                    return [4 /*yield*/, transaction.wait()];
                                                case 4:
                                                    _a.sent();
                                                    resolve(true);
                                                    _a.label = 5;
                                                case 5: return [2 /*return*/];
                                            }
                                        });
                                    }); })
                                        .catch(function (error) {
                                        console.error('Erreur lors de la récupération du solde :', error);
                                    });
                                }
                            }
                        }
                        catch (error) {
                            console.error("Erreur lors de l'achat du booster :", error);
                        }
                        return [2 /*return*/];
                    });
                }); })];
        });
    });
}
exports.buyBooster = buyBooster;
var useAffect = function (asyncEffect, dependencies) {
    if (dependencies === void 0) { dependencies = []; }
    var cancelerRef = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        asyncEffect()
            .then(function (canceler) { return (cancelerRef.current = canceler); })
            .catch(function (error) { return console.warn('Uncatched error', error); });
        return function () {
            if (cancelerRef.current) {
                cancelerRef.current();
                cancelerRef.current = undefined;
            }
        };
    }, dependencies);
};
var useWallet = function () {
    var _a = (0, react_1.useState)(), details = _a[0], setDetails = _a[1];
    var _b = (0, react_1.useState)(), contract = _b[0], setContract = _b[1];
    useAffect(function () { return __awaiter(void 0, void 0, void 0, function () {
        var details_, contract_;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ethereum.connect('metamask')];
                case 1:
                    details_ = _a.sent();
                    if (!details_)
                        return [2 /*return*/];
                    setDetails(details_);
                    return [4 /*yield*/, main.init(details_)];
                case 2:
                    contract_ = _a.sent();
                    if (!contract_)
                        return [2 /*return*/];
                    setContract(contract_);
                    return [2 /*return*/];
            }
        });
    }); }, []);
    return (0, react_1.useMemo)(function () {
        if (!details || !contract)
            return;
        return { details: details, contract: contract };
    }, [details, contract]);
};
