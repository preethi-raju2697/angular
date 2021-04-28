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
const Common_1 = __importDefault(require("../utils/Common"));
const SurgeonModel_1 = require("../model/SurgeonModel");
class SurgonController {
    static save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let surgeon = req.body;
                surgeon["createdBy"] = req.user._id;
                if (!surgeon.patientId)
                    return res.status(400).send({ error: "patientId required" });
                if (!(surgeon.syndromicDiagnosis == "N" || surgeon.syndromicDiagnosis == "S"))
                    return res.status(400).send({ error: "PediactricType Required" });
                if (!surgeon.lipDiagnosis)
                    return res.status(400).send({ error: "lipDiagnosis required" });
                if (!surgeon.palateDiagnosis)
                    return res.status(400).send({ error: "palateDiagnosis required" });
                if (!surgeon.surgicalRec)
                    return res.status(400).send({ error: "surgicalRec required" });
                let user = yield PatientService_1.default.getPatientById(surgeon.patientId);
                if (user) {
                    surgeon.refferId = user.processId;
                    if (!surgeon.refferId)
                        return res.status(404).send({ error: "processId not found" });
                    let helper = yield SurgonController.Helper(user, surgeon);
                    // surgeon.syndromicDiagnosis=helper.name;
                    surgeon.p1 = helper.p1;
                    surgeon.p2 = helper.p2;
                    if (user.status == "SL") {
                        let surgonRes = yield SurgeonService_1.default.saveSurgon(surgeon, { new: true });
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
    static getSurgonList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let surgon = yield PatientService_1.default.getPatientByStatus("SL");
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
    static getSurgeonById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                if (!id)
                    return res.status(400).send({ error: "id required" });
                let surgeonRes = yield SurgeonService_1.default.getById(id);
                if (surgeonRes) {
                    return res.status(200).send({ result: surgeonRes });
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
    static saveSurgonAndMove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield SurgeonModel_1.Surgon.startSession();
            session.startTransaction();
            try {
                const opts = { session };
                let surgeon = req.body;
                surgeon["createdBy"] = req.user._id;
                if (!surgeon.sts) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "sts required" });
                }
                ;
                if (!surgeon.visitId) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "visitId required" });
                }
                ;
                if (!surgeon.patientId) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "patientId required" });
                }
                if (!(surgeon.syndromicDiagnosis == "N" || surgeon.syndromicDiagnosis == "S")) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "PediactricType Required" });
                }
                if (!surgeon.lipDiagnosis) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "lipDiagnosis required" });
                }
                if (!surgeon.palateDiagnosis) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "palateDiagnosis required" });
                }
                if (!surgeon.surgicalRec) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "surgicalRec required" });
                }
                let user = yield PatientService_1.default.getPatientById(surgeon.patientId);
                if (user) {
                    surgeon.refferId = user.processId;
                    if (!surgeon.refferId)
                        return res.status(404).send({ error: "processId not found" });
                    let helper = yield SurgonController.Helper(user, surgeon);
                    // surgeon.syndromicDiagnosis=helper.name;
                    surgeon.p1 = helper.p1;
                    surgeon.p2 = helper.p2;
                    if (user.status == "SL") {
                        let surgonRes = yield SurgeonService_1.default.saveSurgon(surgeon, opts);
                        if (surgonRes.id) {
                            let ids = {
                                _id: surgeon.patientId,
                                "visits._id": surgeon.visitId
                            };
                            let data = {
                                status: "LB",
                                statusAt: new Date(),
                                statusBy: req.user._id,
                                processId: surgeon.visitId,
                                "visits.$.status": "P"
                            };
                            let statusRes;
                            if (surgeon.sts == "M") {
                                if (!surgonRes.surgicalRec.nosurgery) {
                                    statusRes = yield PatientService_1.default.statusUpdatePS(ids, data, opts);
                                    if (statusRes.nModified == 1) {
                                        yield session.commitTransaction();
                                        session.endSession();
                                        return res.status(201).send({ result: "Transaction  Success" });
                                    }
                                    else {
                                        yield session.abortTransaction();
                                        session.endSession();
                                        return res.status(409).send({ result: "Transaction Abonded" });
                                    }
                                }
                                else {
                                    statusRes = yield PatientService_1.default.ProcessCompleted(surgeon.patientId, surgeon.visitId, "SLR", { userId: req.user._id }, opts);
                                    if (statusRes.nModified == 1) {
                                        yield session.commitTransaction();
                                        session.endSession();
                                        return res.status(201).send({ result: "Transaction  Success" });
                                    }
                                    else {
                                        yield session.abortTransaction();
                                        session.endSession();
                                        return res.status(409).send({ result: "Transaction Abonded" });
                                    }
                                }
                            }
                            else if (surgeon.sts == "R") {
                                statusRes = yield PatientService_1.default.ProcessCompleted(surgeon.id, surgeon.visitId, "SLR", { userId: req.user._id }, opts);
                                if (statusRes.nModified == 1) {
                                    yield session.commitTransaction();
                                    session.endSession();
                                    return res.status(201).send({ result: "Transaction  Success" });
                                }
                                else {
                                    yield session.abortTransaction();
                                    session.endSession();
                                    return res.status(409).send({ result: "Transaction Abonded" });
                                }
                            }
                            else {
                                yield session.abortTransaction();
                                session.endSession();
                                return res.status(409).send({ result: "Transaction Abonded" });
                            }
                        }
                        else {
                            if (surgonRes.code == 11000) {
                                yield session.abortTransaction();
                                session.endSession();
                                return res.status(409).send({ error: "Already Exist", key: surgonRes.keyValue });
                            }
                            else {
                                yield session.abortTransaction();
                                session.endSession();
                                return res.status(409).send({ error: surgonRes.message });
                            }
                        }
                    }
                    else {
                        yield session.abortTransaction();
                        session.endSession();
                        return res.status(400).send({ error: "User not moved to surgeon" });
                    }
                }
                else {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(404).send({ error: "Patient Not Found" });
                }
            }
            catch (err) {
                yield session.abortTransaction();
                session.endSession();
                return res.status(500).send({ error: err.message });
            }
        });
    }
    static Helper(patient, surgeon) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let res = {
                    p1: 0,
                    p2: 0,
                    name: ""
                };
                let { years } = yield Common_1.default.dateCalc(patient.dob);
                if (surgeon.syndromicDiagnosis == "N") {
                    res.p1 = 5;
                    res.name = "Non-Syndromic";
                }
                else if (surgeon.syndromicDiagnosis == "S") {
                    res.p1 = 1;
                    res.name = "Syndromic";
                }
                if (surgeon.surgicalRec.other) {
                    res.p2 = 0;
                }
                if (surgeon.surgicalRec.palate && years < 2) {
                    res.p2 = 5;
                }
                if (surgeon.surgicalRec.lip && years <= 10) {
                    res.p2 = 4;
                }
                if (surgeon.surgicalRec.palate && years > 2) {
                    res.p2 = 3;
                }
                if (surgeon.surgicalRec.lip && years > 10) {
                    res.p2 = 2;
                }
                return res;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.default = SurgonController;
//# sourceMappingURL=SurgeonController.js.map