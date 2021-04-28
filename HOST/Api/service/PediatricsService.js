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
Object.defineProperty(exports, "__esModule", { value: true });
const pediatricsModel_1 = require("../model/pediatricsModel");
class PediatricsService {
    static savePediactric(pediactric, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (new pediatricsModel_1.Pediactric(pediactric)).save(opts);
            }
            catch (err) {
                return err;
            }
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let pediatrict = yield pediatricsModel_1.Pediactric.findOne({ _id: id });
                return pediatrict;
            }
            catch (err) {
                return err;
            }
        });
    }
}
exports.default = PediatricsService;
//# sourceMappingURL=PediatricsService.js.map