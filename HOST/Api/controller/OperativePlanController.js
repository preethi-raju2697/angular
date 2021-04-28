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
const PatientService_1 = __importDefault(require("../service/PatientService"));
const OperativePlanService_1 = __importDefault(require("../service/OperativePlanService"));
class OperativePlanController {
    static save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let op = req.body;
                op["createdBy"] = req.user._id;
                if (!op.patientId)
                    return res.status(400).send({ error: "patientId required" });
                if (!op.procedure)
                    return res.status(400).send({ error: "procedure Required" });
                if (!op.surgeon)
                    return res.status(400).send({ error: "surgeon required" });
                if (!op.status)
                    return res.status(400).send({ error: "status required" });
                let user = yield PatientService_1.default.getPatientById(op.patientId);
                if (user) {
                    if (user.status == "OPL") {
                        op.refferId = user.processId;
                        if (!op.refferId)
                            return res.status(404).send({ error: "processId not found" });
                        let opRes = yield OperativePlanService_1.default.save(op);
                        if (opRes.id) {
                            return res.status(201).send({ result: "OperativePlan Created Successfully" });
                        }
                        else {
                            if (opRes.code == 11000) {
                                return res.status(409).send({ error: "Already Exist", key: opRes.keyValue });
                            }
                            else {
                                return res.status(409).send({ error: opRes.message });
                            }
                        }
                    }
                    else {
                        return res.status(400).send({ error: "User not moved to OperativePlan" });
                    }
                }
                else {
                    return res.status(404).send({ error: "Patient Not Found" });
                }
            }
            catch (err) {
                return res.status(500).send({ error: err.message });
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
                    status: "OPL",
                    userId: req.user._id
                };
                let statusRes = yield PatientService_1.default.statusUpdate(statusBdy.id, data, { new: true });
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
    static getOPList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let surgon = yield PatientService_1.default.getPatientByStatusOp("OPL");
                if (surgon.length != 0) {
                    return res.status(200).send({ result: surgon });
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
    static getOperativePlanById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                if (!id)
                    return res.status(400).send({ error: "id required" });
                let opRes = yield OperativePlanService_1.default.getById(id);
                if (opRes) {
                    return res.status(200).send({ result: opRes });
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
exports.default = OperativePlanController;
//# sourceMappingURL=OperativePlanController.js.map