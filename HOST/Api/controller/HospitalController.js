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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HospitalService_1 = __importDefault(require("../service/HospitalService"));
class HospitalController {
    static saveHospital(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let hospital = req.body;
                hospital["createdBy"] = req.user._id;
                if (!hospital.name)
                    return res.status(400).send({ error: "hospital required" });
                if (!hospital.theaters)
                    return res.status(400).send({ error: "theaters Required" });
                let userRes = yield HospitalService_1.default.saveHospital(hospital);
                if (userRes.id) {
                    return res.status(201).send({ result: "hospital Created Successfully" });
                }
                else {
                    return res.status(409).send({ error: userRes.message });
                }
            }
            catch (err) {
                return res.status(500).send({ error: err.message });
            }
        });
    }
    static getAllHospital(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let hospital = yield HospitalService_1.default.getAllHospital();
                if (hospital.length != 0) {
                    return res.status(200).send({ result: hospital });
                }
                else {
                    return res.status(204).send({ result: [] });
                }
            }
            catch (err) {
                return res.status(500).send({ error: err.message });
            }
        });
    }
    static getAnesthesiaById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                if (!id)
                    return res.status(400).send({ error: "id required" });
                let hospital = yield HospitalService_1.default.getById(id);
                if (hospital) {
                    return res.status(200).send({ result: hospital });
                }
                else {
                    return res.status(204).send({ result: {} });
                }
            }
            catch (err) {
                return res.status(500).send({ error: err.message });
            }
        });
    }
}
exports.default = HospitalController;
//# sourceMappingURL=HospitalController.js.map