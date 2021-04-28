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
const LabService_1 = __importDefault(require("../service/LabService"));
const PatientService_1 = __importDefault(require("../service/PatientService"));
const SurgeonService_1 = __importDefault(require("../service/SurgeonService"));
const LabModel_1 = require("../model/LabModel");
class LabController {
    static save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let lab = req.body;
                lab["name"] = req.file.originalname;
                lab["description"] = lab.description;
                lab["filename"] = req.file.filename;
                lab["createdBy"] = req.user._id;
                lab["createdAt"] = new Date();
                if (!lab.patientId)
                    return res.status(400).send({ error: "patientId required" });
                if (!lab.filename)
                    return res.status(400).send({ error: "filename required" });
                let user = yield PatientService_1.default.getPatientById(lab.patientId);
                if (user) {
                    if (user.status == "LB") {
                        lab.refferId = user.processId;
                        if (!lab.refferId)
                            return res.status(404).send({ error: "processId not found" });
                        let labRes = yield LabService_1.default.saveLab(lab, { new: true });
                        if (labRes.id) {
                            return res.status(201).send({ result: "Lab Created Successfully" });
                        }
                        else {
                            if (labRes.code == 11000) {
                                return res.status(409).send({ error: "Already Exist", key: labRes.keyValue });
                            }
                            else {
                                return res.status(409).send({ error: labRes.message });
                            }
                        }
                    }
                    else {
                        return res.status(400).send({ error: "User not moved to lab" });
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
                            status: "LB",
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
    static getLabList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let anesthesia = yield PatientService_1.default.getPatientByStatus("LB");
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
    static getLabById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                if (!id)
                    return res.status(400).send({ error: "id required" });
                let anRes = yield LabService_1.default.getById(id);
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
    static saveLabAndMove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield LabModel_1.Lab.startSession();
            session.startTransaction();
            try {
                const opts = { session };
                let lab = req.body;
                lab["name"] = req.file.originalname;
                lab["description"] = lab.description;
                lab["filename"] = req.file.filename;
                lab["createdBy"] = req.user._id;
                lab["createdAt"] = new Date();
                if (!lab.sts) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "sts required" });
                }
                ;
                if (!lab.visitId) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "visitId required" });
                }
                ;
                if (!lab.patientId) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "patientId required" });
                }
                if (!lab.filename) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "filename required" });
                }
                let user = yield PatientService_1.default.getPatientById(lab.patientId);
                if (user) {
                    if (user.status == "LB") {
                        lab.refferId = user.processId;
                        if (!lab.refferId) {
                            yield session.abortTransaction();
                            session.endSession();
                            return res.status(404).send({ error: "processId not found" });
                        }
                        let anesthesiaRes = yield LabService_1.default.saveLab(lab, opts);
                        if (anesthesiaRes.id) {
                            let ids = {
                                _id: lab.patientId,
                                "visits._id": lab.visitId
                            };
                            let data = {
                                status: "AL",
                                statusAt: new Date(),
                                statusBy: req.user._id,
                                processId: lab.visitId,
                                "visits.$.status": "P"
                            };
                            let statusRes;
                            if (lab.sts == "M") {
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
                            else if (lab.sts == "R") {
                                statusRes = yield PatientService_1.default.ProcessCompleted(lab.patientId, lab.visitId, "LBR", { userId: req.user._id }, opts);
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
exports.default = LabController;
//# sourceMappingURL=LabController.js.map