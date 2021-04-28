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
const UsersModel_1 = require("../model/UsersModel");
class PatientController {
    static savePatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let patient = req.body;
                patient.createdBy = req.user._id;
                if (!patient.patientName)
                    return res.status(400).send({ error: "patientName required" });
                if (!patient.date)
                    return res.status(400).send({ error: "date Required" });
                if (!patient.dob)
                    return res.status(400).send({ error: "dob required" });
                if (!patient.age)
                    return res.status(400).send({ error: "age required" });
                if (!patient.sex)
                    return res.status(400).send({ error: "sex required" });
                if (!patient.contactInfo)
                    return res.status(400).send({ error: "contactInfo required" });
                if (!patient.programSite)
                    return res.status(400).send({ error: "programSite required" });
                if (!patient.contactInfo.distanceTravelled)
                    return res.status(400).send({ error: "distanceTravelled required" });
                if (!(typeof patient.contactInfo.accomodation === 'boolean'))
                    return res.status(400).send({ error: "accomodation required" });
                if (!patient.createdBy)
                    return res.status(400).send({ error: "createdBy required" });
                let helper = yield PatientController.Helper(patient);
                patient.p3 = helper.p3;
                patient.p4 = helper.p4;
                patient["status"] = "";
                let patientRes = yield PatientService_1.default.savePatient(patient);
                if (patientRes.id) {
                    return res.status(201).send({ result: "Patient Created Successfully" });
                }
                else {
                    if (patientRes.code == 11000) {
                        return res.status(409).send({ error: "Already Exist", key: patientRes.keyValue });
                    }
                    else {
                        return res.status(409).send({ error: patientRes.message });
                    }
                }
            }
            catch (err) {
                return res.status(500).send({ error: err.message });
            }
        });
    }
    static getAllPatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let pcList = yield PatientService_1.default.getAllPatient();
                return res.status(200).send({ result: pcList });
            }
            catch (err) {
                return res.status(500).send({ error: err.message });
            }
        });
    }
    static getAllConsultPatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let Clist = yield PatientService_1.default.getAllPatientByConsult({ status: { $in: ["VLR", "PLR", "SLR", "ALR", "LB", "LBR", "SA"] } });
                return res.status(200).send({ result: Clist });
            }
            catch (err) {
                return res.status(500).send({ error: err.message });
            }
        });
    }
    static saveNotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let notesBdy = req.body;
                notesBdy["notes"]["createdBy"] = req.user._id;
                if (!notesBdy.id)
                    return res.status(400).send({ error: "id required" });
                let noteRes = yield PatientService_1.default.saveNotes(notesBdy.id, notesBdy.notes);
                if (noteRes.nModified == 1) {
                    return res.status(201).send({ result: "Notes Created Successfully" });
                }
                else {
                    return res.status(409).send({ error: "Notes Not Saved" });
                }
            }
            catch (err) {
                return res.status(500).send({ error: err.message });
            }
        });
    }
    static saveGeneral(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let generalBdy = req.body;
                generalBdy["general"]["createdBy"] = req.user._id;
                generalBdy["general"]["createdAt"] = new Date();
                if (!generalBdy.id)
                    return res.status(400).send({ error: "id required" });
                let genRes = yield PatientService_1.default.saveGeneral(generalBdy.id, generalBdy.general);
                if (genRes.nModified == 1) {
                    return res.status(201).send({ result: "General Created Successfully" });
                }
                else {
                    return res.status(409).send({ error: "General Not Saved" });
                }
            }
            catch (err) {
                return res.status(500).send({ error: err.message });
            }
        });
    }
    static saveAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let appBdy = req.body;
                appBdy["appointments"]["createdBy"] = req.user._id;
                appBdy["appointments"]["createdAt"] = new Date();
                if (!appBdy.id)
                    return res.status(400).send({ error: "id required" });
                let appRes = yield PatientService_1.default.saveAppointment(appBdy.id, appBdy.appointments);
                if (appRes.nModified == 1) {
                    return res.status(201).send({ result: "Appointment Created Successfully" });
                }
                else {
                    return res.status(409).send({ error: "Appointment Not Saved" });
                }
            }
            catch (err) {
                return res.status(500).send({ error: err.message });
            }
        });
    }
    static saveVisit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let visitBdy = req.body;
                visitBdy["visits"]["createdBy"] = req.user._id;
                visitBdy["visits"]["createdAt"] = new Date();
                visitBdy["visits"]["orders"] = [];
                visitBdy["visits"]["vitals"] = [];
                visitBdy["visits"]["notes"] = [];
                visitBdy["visits"]["procedurs"] = [];
                visitBdy["visits"]["charges"] = [];
                if (!visitBdy.id)
                    return res.status(400).send({ error: "id required" });
                let visitRes = yield PatientService_1.default.saveVisit(visitBdy.id, visitBdy.visits);
                if (visitRes.nModified == 1) {
                    return res.status(201).send({ result: "Visits Created Successfully" });
                }
                else {
                    return res.status(409).send({ error: "Visits Not Saved" });
                }
            }
            catch (err) {
                return res.status(500).send({ error: err.message });
            }
        });
    }
    static saveVital(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let vitalBdy = req.body;
                vitalBdy["vitals"]["createdBy"] = req.user._id;
                vitalBdy["vitals"]["createdAt"] = new Date();
                if (!vitalBdy.id)
                    return res.status(400).send({ error: "id required" });
                if (!vitalBdy.visitId)
                    return res.status(400).send({ error: "visitId required" });
                let vitalRes = yield PatientService_1.default.saveVital(vitalBdy.id, vitalBdy.visitId, vitalBdy.vitals, { new: true });
                if (vitalRes.nModified == 1) {
                    return res.status(201).send({ result: "Vitals Created Successfully" });
                }
                else {
                    return res.status(409).send({ error: "Vitals Not Saved" });
                }
            }
            catch (err) {
                return res.status(500).send({ error: err.message });
            }
        });
    }
    static saveVisitNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let noteBdy = req.body;
                noteBdy["notes"]["createdBy"] = req.user._id;
                noteBdy["notes"]["createdAt"] = new Date();
                if (!noteBdy.id)
                    return res.status(400).send({ error: "id required" });
                if (!noteBdy.visitId)
                    return res.status(400).send({ error: "visitId required" });
                let vitalRes = yield PatientService_1.default.saveVisitNote(noteBdy.id, noteBdy.visitId, noteBdy.notes);
                if (vitalRes.nModified == 1) {
                    return res.status(201).send({ result: "Visit Notes Created Successfully" });
                }
                else {
                    return res.status(409).send({ error: "Visit Notes Not Saved" });
                }
            }
            catch (err) {
                return res.status(500).send({ error: err.message });
            }
        });
    }
    static saveProcedure(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let procedureBdy = req.body;
                procedureBdy["createdBy"] = req.user._id;
                procedureBdy["createdAt"] = new Date();
                procedureBdy["chargeItem"] = [];
                procedureBdy["medication"] = [];
                if (!procedureBdy.id)
                    return res.status(400).send({ error: "id required" });
                if (!procedureBdy.visitId)
                    return res.status(400).send({ error: "visitId required" });
                let ProcedureRes = yield PatientService_1.default.saveProcedure(procedureBdy.id, procedureBdy.visitId, procedureBdy);
                if (ProcedureRes.nModified == 1) {
                    return res.status(201).send({ result: "Procedure Created Successfully" });
                }
                else {
                    return res.status(409).send({ error: "Procedure Not Saved" });
                }
            }
            catch (err) {
                return res.status(500).send({ error: err.message });
            }
        });
    }
    static saveScane(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let scanBdy = req.body;
                scanBdy["createdBy"] = req.user._id;
                scanBdy["createdAt"] = new Date();
                scanBdy["name"] = req.file.originalname;
                scanBdy["fileName"] = req.file.filename;
                if (!scanBdy.id)
                    return res.status(400).send({ error: "id required" });
                if (!scanBdy.visitId)
                    return res.status(400).send({ error: "visitId required" });
                let scanRes = yield PatientService_1.default.saveScane(scanBdy.id, scanBdy.visitId, scanBdy);
                if (scanRes.nModified == 1) {
                    return res.status(201).send({ result: "Scane Created Successfully" });
                }
                else {
                    return res.status(409).send({ error: "Scane Not Saved" });
                }
            }
            catch (err) {
                return res.status(500).send({ error: err.message });
            }
        });
    }
    static savePrChargeItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let chargeItmBdy = req.body;
                chargeItmBdy["chargeItem"]["createdBy"] = req.user._id;
                chargeItmBdy["chargeItem"]["createdAt"] = new Date();
                if (!chargeItmBdy.id)
                    return res.status(400).send({ error: "id required" });
                if (!chargeItmBdy.visitId)
                    return res.status(400).send({ error: "visitId required" });
                if (!chargeItmBdy.procedureId)
                    return res.status(400).send({ error: "procedureId required" });
                let chargeItmRes = yield PatientService_1.default.savePrChargeItem(chargeItmBdy.id, chargeItmBdy.visitId, chargeItmBdy.procedureId, chargeItmBdy.chargeItem);
                if (chargeItmRes.nModified == 1) {
                    return res.status(201).send({ result: "chargeItem Created Successfully" });
                }
                else {
                    return res.status(409).send({ error: "chargeItem Not Saved" });
                }
            }
            catch (err) {
                return res.status(500).send({ error: err.message });
            }
        });
    }
    static savePrMedication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let medicationBdy = req.body;
                medicationBdy["medication"]["createdBy"] = req.user._id;
                medicationBdy["medication"]["createdAt"] = new Date();
                if (!medicationBdy.id)
                    return res.status(400).send({ error: "id required" });
                if (!medicationBdy.visitId)
                    return res.status(400).send({ error: "visitId required" });
                if (!medicationBdy.procedureId)
                    return res.status(400).send({ error: "procedureId required" });
                let mediRes = yield PatientService_1.default.savePrmedication(medicationBdy.id, medicationBdy.visitId, medicationBdy.procedureId, medicationBdy.medication);
                if (mediRes.nModified == 1) {
                    return res.status(201).send({ result: "medication Created Successfully" });
                }
                else {
                    return res.status(409).send({ error: "medication Not Saved" });
                }
            }
            catch (err) {
                return res.status(500).send({ error: err.message });
            }
        });
    }
    static saveMedication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let mediBdy = req.body;
                mediBdy["medication"]["createdBy"] = req.user._id;
                mediBdy["medication"]["createdAt"] = new Date();
                if (!mediBdy.id)
                    return res.status(400).send({ error: "id required" });
                let mediRes = yield PatientService_1.default.saveMedication(mediBdy.id, mediBdy.medication);
                if (mediRes.nModified == 1) {
                    return res.status(201).send({ result: "medication Created Successfully" });
                }
                else {
                    return res.status(409).send({ error: "medication Not Saved" });
                }
            }
            catch (err) {
                return res.status(500).send({ error: err.message });
            }
        });
    }
    static savePhoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let photoBdy = req.body;
                photoBdy['photos'] = {};
                photoBdy["photos"]["name"] = req.file.originalname;
                photoBdy["photos"]["description"] = photoBdy.description;
                photoBdy["photos"]["filename"] = req.file.filename;
                photoBdy["photos"]["createdBy"] = req.user._id;
                photoBdy["photos"]["createdAt"] = new Date();
                if (!photoBdy.id)
                    return res.status(400).send({ error: "id required" });
                if (!photoBdy.photos.filename)
                    return res.status(400).send({ error: "photo required" });
                let photoRes = yield PatientService_1.default.savePhoto(photoBdy.id, photoBdy.photos);
                if (photoRes.nModified == 1) {
                    return res.status(201).send({ result: "photo saved Successfully" });
                }
                else {
                    return res.status(409).send({ error: "photo Not Saved" });
                }
            }
            catch (err) {
                return res.status(500).send({ error: err.message });
            }
        });
    }
    static getPatientById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                if (!id)
                    return res.status(400).send({ error: "id required" });
                let patient = yield PatientService_1.default.getPatientById(id);
                if (patient.id) {
                    return res.status(200).send({ result: patient });
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
    static getvisitById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                let visitId = req.params.visitId;
                if (!id)
                    return res.status(400).send({ error: "id required" });
                let patient = yield PatientService_1.default.getPatientById(id);
                if (patient.id) {
                    let visit = patient.visits.find(s => s.id == visitId);
                    let { _id, patientNumber, patientName, date, dob, age, sex } = patient;
                    let data = {
                        _id,
                        patientNumber,
                        patientName,
                        date,
                        dob,
                        age,
                        sex,
                        visits: visit ? visit : {}
                    };
                    return res.status(200).send({ result: data });
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
    static getPatientDtlList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                let visitId = req.params.visitId;
                if (!id)
                    return res.status(400).send({ error: "id required" });
                if (!visitId)
                    return res.status(400).send({ error: "visitId required" });
                let pvDta = yield PatientService_1.default.getPatientDtlList(id, visitId);
                if (pvDta.length != 0 && pvDta.length <= 1) {
                    return res.status(200).send({ result: pvDta[0] });
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
    static saveVisitAndMove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield UsersModel_1.User.startSession();
            session.startTransaction();
            try {
                const opts = { session };
                let vitalBdy = req.body;
                vitalBdy["vitals"]["createdBy"] = req.user._id;
                vitalBdy["vitals"]["createdAt"] = new Date();
                if (!vitalBdy.id) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "id required" });
                }
                ;
                if (!vitalBdy.sts) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "sts required" });
                }
                ;
                if (!vitalBdy.visitId) {
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(400).send({ error: "visitId required" });
                }
                ;
                let vitalRes = yield PatientService_1.default.saveVital(vitalBdy.id, vitalBdy.visitId, vitalBdy.vitals, opts);
                if (vitalRes.nModified == 1) {
                    let ids = {
                        _id: vitalBdy.id,
                        "visits._id": vitalBdy.visitId
                    };
                    let data = {
                        status: "PL",
                        statusAt: new Date(),
                        statusBy: req.user._id,
                        processId: vitalBdy.visitId,
                        "visits.$.status": "P"
                    };
                    let statusRes;
                    if (vitalBdy.sts == "M") {
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
                    else if (vitalBdy.sts == "R") {
                        statusRes = yield PatientService_1.default.ProcessCompleted(vitalBdy.id, vitalBdy.visitId, "VLR", { userId: req.user._id }, opts);
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
                    yield session.abortTransaction();
                    session.endSession();
                    return res.status(409).send({ result: "Transaction Abonded" });
                }
            }
            catch (err) {
                yield session.abortTransaction();
                session.endSession();
                return res.status(500).send({ error: err.message });
            }
        });
    }
    static Helper(value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // value.contactInfo
                let res = {
                    p3: 0,
                    p4: 0
                };
                let dis = value.contactInfo.distanceTravelled;
                let acc = value.contactInfo.accomodation;
                res.p4 = acc ? 1 : 5;
                switch (true) {
                    case (500 <= dis):
                        res.p3 = 5;
                        break;
                    case (400 <= dis && dis <= 499):
                        res.p3 = 4;
                        break;
                    case (300 <= dis && dis <= 399):
                        res.p3 = 3;
                        break;
                    case (200 <= dis && dis <= 299):
                        res.p3 = 2;
                        break;
                    case (100 <= dis && dis <= 199):
                        res.p3 = 1;
                        break;
                    default:
                        res.p3 = 0;
                        break;
                }
                return res;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.default = PatientController;
//# sourceMappingURL=PatientController.js.map