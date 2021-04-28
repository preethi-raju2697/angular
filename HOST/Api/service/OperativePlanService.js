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
const OperativePlanModel_1 = require("../model/OperativePlanModel");
class OperativePlanService {
    static save(op) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (new OperativePlanModel_1.OperativePlan(op)).save();
            }
            catch (err) {
                return err;
            }
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let op = yield OperativePlanModel_1.OperativePlan.findOne({ _id: id });
                return op;
            }
            catch (err) {
                return err;
            }
        });
    }
}
exports.default = OperativePlanService;
//# sourceMappingURL=OperativePlanService.js.map