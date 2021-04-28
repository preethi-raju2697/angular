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
const SurgeonModel_1 = require("../model/SurgeonModel");
class SurgonService {
    static saveSurgon(surgon, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (new SurgeonModel_1.Surgon(surgon)).save(opts);
            }
            catch (err) {
                return err;
            }
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let surgon = yield SurgeonModel_1.Surgon.findOne({ _id: id });
                return surgon;
            }
            catch (err) {
                return err;
            }
        });
    }
    static getByvisit(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let surgon = yield SurgeonModel_1.Surgon.findOne({ patientId: ids.id, refferId: ids.visitId });
                return surgon;
            }
            catch (err) {
                return err;
            }
        });
    }
}
exports.default = SurgonService;
//# sourceMappingURL=SurgeonService.js.map