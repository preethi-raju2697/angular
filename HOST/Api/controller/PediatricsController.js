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
const PediatricsService_1 = __importDefault(require("../service/PediatricsService"));
const PatientService_1 = __importDefault(require("../service/PatientService"));
const pediatricsModel_1 = require("../model/pediatricsModel");
class PediatricsController {
    static save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let pediactric = req.body;
                pediactric["createdBy"] = req.user._id;
                if (!pediactric.patientId)
                    return res.status(400).send({ error: "patientId required" });
                if (!pediactric.PediactricType)
                    return res.status(400).send({ error: "PediactricType Required" });
                if (!pediactric.objective)
                    return res.status(400).send({ error: "objective required" });
                if (!pediactric.heent)
                    return res.status(400).send({ error: "heent required" });
                if (!pediactric.oralCare)
                    return res.status(400).send({ error: "oralCare required" });
                if (!pediactric.cl)
                    return res.status(400).send({ error: "cl required" });
                if (!pediactric.heart)
                    return res.status(400).send({ error: "heart required" });
                if (!pediactric.ge)
                    return res.status(400).send({ error: "ge required" });
                if (!pediactric.musculoSkeletal)
                    return res.status(400).send({ error: "musculoSkeletal required" });
                if (!pediactric.gu)
                    return res.status(400).send({ error: "gu required" });
                if (!pediactric.extremitiesSkin)
                    return res.status(400).send({ error: "extremitiesSkin required" });
                let user = yield PatientService_1.default.getPatientById(pediactric.patientId);
                if (user) {
                    if (user.status == "PL") {
                        pediactric.refferId = user.processId;
                        if (!pediactric.refferId)
                            return res.status(404).send({ error: "processId not found" });
                        let pediactricRes = yield PediatricsService_1.default.savePediactric(pediactric, { new: true });
                        if (pediactricRes.id) {
                            return res.status(201).send({ result: "pediactric Created Successfully" });
                        }
                        else {
                            if (pediactricRes.code == 11000) {
                                return res.status(409).send({ error: "Already Exist", key: pediactricRes.keyValue });
                            }
                            else {
                                return res.status(409).send({ error: pediactricRes.message });
                            }
                        }
                    }
                    else {
                        return res.status(400).send({ error: "User not moved to pediatric" });
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
                if (!statusBdy.visitId)
                    return res.status(400).send({ error: "visitId required" });
                let ids = {
                    _id: statusBdy.id,
                    "visits._id": statusBdy.visitId
                };
                let data = {
                    status: "PL",
                    statusAt: new Date(),
                    statusBy: req.user._id,
                    processId: statusBdy.visitId,
                    "visits.$.status": "P"
                };
                let statusRes = yield PatientService_1.default.statusUpdatePS(ids, data, { new: true });
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
    static getPediactrictList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let patient = yield PatientService_1.default.getPatientByStatus("PL");
                if (patient.length != 0) {
                    return res.status(200).send({ result: patient });
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
    static getPediactrictById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                if (!id)
                    return res.status(400).send({ error: "id required" });
                let PediactrictRes = yield PediatricsService_1.default.getById(id);
                if (PediactrictRes) {
                    return res.status(200).send({ result: PediactrictRes });
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
    static savePediactrictAndMove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield pediatricsModel_1.Pediactric.startSession();
            session.startTransaction();
            try {
                const opts = { session };
                let pediactric = req.body;
                pediactric["createdBy"] = req.user._id;
                if (!pediactric.sts) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "sts required" });
                }
                ;
                if (!pediactric.visitId) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "visitId required" });
                }
                ;
                if (!pediactric.patientId) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "patientId required" });
                }
                if (!pediactric.PediactricType) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "PediactricType Required" });
                }
                if (!pediactric.objective) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "objective required" });
                }
                if (!pediactric.heent) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "heent required" });
                }
                if (!pediactric.oralCare) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "oralCare required" });
                }
                if (!pediactric.cl) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "cl required" });
                }
                if (!pediactric.heart) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "heart required" });
                }
                if (!pediactric.ge) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "ge required" });
                }
                if (!pediactric.musculoSkeletal) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "musculoSkeletal required" });
                }
                if (!pediactric.gu) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "gu required" });
                }
                if (!pediactric.extremitiesSkin) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "extremitiesSkin required" });
                }
                let user = yield PatientService_1.default.getPatientById(pediactric.patientId);
                if (user) {
                    if (user.status == "PL") {
                        pediactric.refferId = user.processId;
                        if (!pediactric.refferId)
                            return res.status(404).send({ error: "processId not found" });
                        let pediactricRes = yield PediatricsService_1.default.savePediactric(pediactric, opts);
                        if (pediactricRes.id) {
                            let ids = {
                                _id: pediactric.patientId,
                                "visits._id": pediactric.visitId
                            };
                            let data = {
                                status: "SL",
                                statusAt: new Date(),
                                statusBy: req.user._id,
                                processId: pediactric.visitId,
                                "visits.$.status": "P"
                            };
                            let statusRes;
                            if (pediactric.sts == "M") {
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
                            else if (pediactric.sts == "R") {
                                statusRes = yield PatientService_1.default.ProcessCompleted(pediactric.patientId, pediactric.visitId, "PLR", { userId: req.user._id }, opts);
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
                            if (pediactricRes.code == 11000) {
                                yield session.abortTransaction();
                                session.endSession();
                                return res.status(409).send({ error: "Already Exist", key: pediactricRes.keyValue });
                            }
                            else {
                                yield session.abortTransaction();
                                session.endSession();
                                return res.status(409).send({ error: pediactricRes.message });
                            }
                        }
                    }
                    else {
                        yield session.abortTransaction();
                        session.endSession();
                        return res.status(400).send({ error: "User not moved to pediatric" });
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
}
exports.default = PediatricsController;
//# sourceMappingURL=PediatricsController.js.map