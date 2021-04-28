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
const AnesthesiaService_1 = __importDefault(require("../service/AnesthesiaService"));
const PatientService_1 = __importDefault(require("../service/PatientService"));
const SurgeonService_1 = __importDefault(require("../service/SurgeonService"));
const AnesthesiaModel_1 = require("../model/AnesthesiaModel");
class AnesthesiaController {
    static save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let anesthesia = req.body;
                anesthesia["createdBy"] = req.user._id;
                if (!anesthesia.patientId)
                    return res.status(400).send({ error: "patientId required" });
                if (!anesthesia.patientCleared)
                    return res.status(400).send({ error: "patientCleared required" });
                if (!anesthesia.comments)
                    return res.status(400).send({ error: "comments required" });
                if (!anesthesia.type)
                    return res.status(400).send({ error: "type required" });
                let user = yield PatientService_1.default.getPatientById(anesthesia.patientId);
                if (user) {
                    if (user.status == "AL") {
                        anesthesia.refferId = user.processId;
                        if (!anesthesia.refferId)
                            return res.status(404).send({ error: "processId not found" });
                        let anesthesiaRes = yield AnesthesiaService_1.default.saveAnesthesia(anesthesia, { new: true });
                        if (anesthesiaRes.id) {
                            return res.status(201).send({ result: "anesthesia Created Successfully" });
                        }
                        else {
                            if (anesthesiaRes.code == 11000) {
                                return res.status(409).send({ error: "Already Exist", key: anesthesiaRes.keyValue });
                            }
                            else {
                                return res.status(409).send({ error: anesthesiaRes.message });
                            }
                        }
                    }
                    else {
                        return res.status(400).send({ error: "User not moved to anesthesia" });
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
                let surgon = yield SurgeonService_1.default.getByvisit(statusBdy);
                if (surgon) {
                    if (surgon.surgicalRec.nosurgery) {
                        let ids = {
                            _id: statusBdy.id,
                            "visits._id": statusBdy.visitId
                        };
                        let dataPS = {
                            status: "",
                            statusAt: new Date(),
                            statusBy: req.user._id,
                            processId: "",
                            "visits.$.status": "C"
                        };
                        let statusResPS = yield PatientService_1.default.statusUpdatePS(ids, dataPS, { new: true });
                        if (statusResPS.nModified == 1) {
                            return res.status(201).send({ result: "status updated Successfully" });
                        }
                        else {
                            return res.status(409).send({ error: "status Not updated" });
                        }
                    }
                    else {
                        let data = {
                            status: "AL",
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
                }
                else {
                    return res.status(404).send({ error: "Data Not Found" });
                }
            }
            catch (err) {
                return res.status(500).send({ error: "Server Error Please Try Again Later" });
            }
        });
    }
    static getAnesthesiaList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let anesthesia = yield PatientService_1.default.getPatientByStatus("AL");
                if (anesthesia.length != 0) {
                    return res.status(200).send({ result: anesthesia });
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
                let anRes = yield AnesthesiaService_1.default.getById(id);
                if (anRes) {
                    return res.status(200).send({ result: anRes });
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
    static saveAnesthesiaAndMove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield AnesthesiaModel_1.Anesthesia.startSession();
            session.startTransaction();
            try {
                const opts = { session };
                let anesthesia = req.body;
                anesthesia["createdBy"] = req.user._id;
                if (!anesthesia.sts) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "sts required" });
                }
                ;
                if (!anesthesia.visitId) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "visitId required" });
                }
                ;
                if (!anesthesia.patientId) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "patientId required" });
                }
                if (!anesthesia.patientCleared) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "patientCleared required" });
                }
                if (!anesthesia.comments) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "comments required" });
                }
                if (!anesthesia.type) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "type required" });
                }
                let user = yield PatientService_1.default.getPatientById(anesthesia.patientId);
                if (user) {
                    if (user.status == "AL") {
                        anesthesia.refferId = user.processId;
                        if (!anesthesia.refferId) {
                            yield session.abortTransaction();
                            session.endSession();
                            return res.status(404).send({ error: "processId not found" });
                        }
                        let anesthesiaRes = yield AnesthesiaService_1.default.saveAnesthesia(anesthesia, opts);
                        if (anesthesiaRes.id) {
                            let ids = {
                                _id: anesthesia.patientId,
                                "visits._id": anesthesia.visitId
                            };
                            let data = {
                                status: "SA",
                                statusAt: new Date(),
                                statusBy: req.user._id,
                                processId: anesthesia.visitId,
                                "visits.$.status": "P"
                            };
                            let statusRes;
                            if (anesthesia.sts == "M") {
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
                            else if (anesthesia.sts == "R") {
                                statusRes = yield PatientService_1.default.ProcessCompleted(anesthesia.patientId, anesthesia.visitId, "ALR", { userId: req.user._id }, opts);
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
                            if (anesthesiaRes.code == 11000) {
                                yield session.abortTransaction();
                                session.endSession();
                                return res.status(409).send({ error: "Already Exist", key: anesthesiaRes.keyValue });
                            }
                            else {
                                yield session.abortTransaction();
                                session.endSession();
                                return res.status(409).send({ error: anesthesiaRes.message });
                            }
                        }
                    }
                    else {
                        yield session.abortTransaction();
                        session.endSession();
                        return res.status(400).send({ error: "User not moved to anesthesia" });
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
exports.default = AnesthesiaController;
//# sourceMappingURL=AnesthesiaController.js.map