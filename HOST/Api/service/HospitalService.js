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
const HospitalModel_1 = require("../model/HospitalModel");
class HospitalService {
    static saveHospital(hospital) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (new HospitalModel_1.Hospital(hospital)).save();
            }
            catch (err) {
                return err;
            }
        });
    }
    static getAllHospital() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let anesthesia = yield HospitalModel_1.Hospital.find({ isActive: true });
                return anesthesia;
            }
            catch (err) {
                return err;
            }
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let anesthesia = yield HospitalModel_1.Hospital.findOne({ _id: id });
                return anesthesia;
            }
            catch (err) {
                return err;
            }
        });
    }
}
exports.default = HospitalService;
//# sourceMappingURL=HospitalService.js.map