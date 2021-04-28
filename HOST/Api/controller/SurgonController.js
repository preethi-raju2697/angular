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
const SurgeonService_1 = __importDefault(require("../service/SurgeonService"));
const PatientService_1 = __importDefault(require("../service/PatientService"));
class PediatricsController {
    static save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let surgeon = req.body;
                surgeon["createdBy"] = req.user._id;
                if (!surgeon.patientId)
                    return res.status(400).send({ error: "patientId required" });
                if (!surgeon.syndromicDiagnosis)
                    return res.status(400).send({ error: "PediactricType Required" });
                if (!surgeon.lipDiagnosis)
                    return res.status(400).send({ error: "objective required" });
                if (!surgeon.palateDiagnosis)
                    return res.status(400).send({ error: "heent required" });
                if (!surgeon.otherDiagnosis)
                    return res.status(400).send({ error: "oralCare required" });
                if (!surgeon.surgicalRec)
                    return res.status(400).send({ error: "cl required" });
                if (!surgeon.comments)
                    return res.status(400).send({ error: "heart required" });
                let user = yield PatientService_1.default.getPatientById(surgeon.patientId);
                if (user) {
                    if (user.status == "SL") {
                        let surgonRes = yield SurgeonService_1.default.saveSurgon(surgeon);
                        if (surgonRes.id) {
                            return res.status(201).send({ result: "surgeon Created Successfully" });
                        }
                        else {
                            if (surgonRes.code == 11000) {
                                return res.status(409).send({ error: "Already Exist", key: surgonRes.keyValue });
                            }
                            else {
                                return res.status(409).send({ error: surgonRes.message });
                            }
                        }
                    }
                    else {
                        return res.status(400).send({ error: "User not moved to surgeon" });
                    }
                }
                else {
                    return res.status(404).send({ error: "Patient Not Found" });
                }
            }
            catch (err) {
                return res.status(500).send({ error: "Server Error Please Try Again Later" });
            }
        });
    }
    static statusUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let statusBdy = req.body;
                if (!statusBdy.id)
                    return res.status(400).send({ error: "id required" });
                let data = {
                    status: "SL",
                    userId: req.user._id
                };
                let statusRes = yield PatientService_1.default.statusUpdate(statusBdy.id, data);
                if (statusRes.nModified == 1) {
                    return res.status(201).send({ result: "status updated Successfully" });
                }
                else {
                    return res.status(409).send({ error: "status Not updated" });
                }
            }
            catch (err) {
                return res.status(500).send({ error: "Server Error Please Try Again Later" });
            }
        });
    }
}
exports.default = PediatricsController;
//# sourceMappingURL=SurgonController.js.map