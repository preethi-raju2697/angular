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
const PatientModel_1 = require("../model/PatientModel");
const mongoose = require('mongoose');
class PatientService {
    static savePatient(patient) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (new PatientModel_1.Patient(patient)).save();
            }
            catch (err) {
                return err;
            }
        });
    }
    static getAllPatient() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ptList = yield PatientModel_1.Patient.find();
                return ptList;
            }
            catch (err) {
                return err;
            }
        });
    }
    static getAllPatientByConsult(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let Clist = yield PatientModel_1.Patient.find(filter);
                return Clist;
            }
            catch (err) {
            }
        });
    }
    static saveNotes(id, notes) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let notesRes = yield PatientModel_1.Patient.updateOne({ _id: id }, {
                    $push: {
                        notes,
                    }
                }, { new: true });
                return notesRes;
            }
            catch (err) {
                return err;
            }
        });
    }
    static saveGeneral(id, general) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let generalRes = yield PatientModel_1.Patient.updateOne({ _id: id }, {
                    $set: {
                        general
                    }
                }, { new: true });
                return generalRes;
            }
            catch (err) {
                return err;
            }
        });
    }
    static saveAppointment(id, appointments) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let appRes = yield PatientModel_1.Patient.updateOne({ _id: id }, {
                    $push: {
                        appointments
                    }
                }, { new: true });
                return appRes;
            }
            catch (err) {
                return err;
            }
        });
    }
    static saveVisit(id, visits) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let visitRes = yield PatientModel_1.Patient.updateOne({ _id: id }, {
                    $push: {
                        visits
                    }
                }, { new: true });
                return visitRes;
            }
            catch (err) {
                return err;
            }
        });
    }
    static saveVital(id, visitId, vitals, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let vitalRes = yield PatientModel_1.Patient.updateOne({ _id: id, "visits._id": visitId }, {
                    $push: {
                        "visits.$.vitals": Object.assign({}, vitals)
                    }
                }, opts);
                return vitalRes;
            }
            catch (err) {
                return err;
            }
        });
    }
    static saveVisitNote(id, visitId, notes) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let noteRes = yield PatientModel_1.Patient.updateOne({ _id: id, "visits._id": visitId }, {
                    $push: {
                        "visits.$.notes": Object.assign({}, notes)
                    }
                }, { new: true });
                return noteRes;
            }
            catch (err) {
                return err;
            }
        });
    }
    static saveProcedure(id, visitId, procedure) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                delete procedure.id;
                delete procedure.visitId;
                let procedureRes = yield PatientModel_1.Patient.updateOne({ _id: id, "visits._id": visitId }, {
                    $push: {
                        "visits.$.procedures": Object.assign({}, procedure)
                    }
                }, { new: true });
                return procedureRes;
            }
            catch (err) {
                return err;
            }
        });
    }
    static saveScane(id, visitId, scan) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                delete scan.id;
                delete scan.visitId;
                let scanRes = yield PatientModel_1.Patient.updateOne({ _id: id, "visits._id": visitId }, {
                    $push: {
                        "visits.$.scan": Object.assign({}, scan)
                    }
                }, { new: true });
                return scanRes;
            }
            catch (err) {
                return err;
            }
        });
    }
    static savePrChargeItem(id, visitId, procedureId, chargeItem) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let chargeItemRes = yield PatientModel_1.Patient.updateOne({ _id: id, "visits._id": visitId, "visits.procedures._id": procedureId }, {
                    $push: {
                        "visits.$[i].procedures.$[j].chargeItem": Object.assign({}, chargeItem)
                    }
                }, { arrayFilters: [{ "i._id": visitId }, { "j._id": procedureId }] });
                return chargeItemRes;
            }
            catch (err) {
                return err;
            }
        });
    }
    static savePrmedication(id, visitId, procedureId, medication) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let medicationRes = yield PatientModel_1.Patient.updateOne({ _id: id, "visits._id": visitId, "visits.procedures._id": procedureId }, {
                    $push: {
                        "visits.$[i].procedures.$[j].medication": Object.assign({}, medication)
                    }
                }, { arrayFilters: [{ "i._id": visitId }, { "j._id": procedureId }] });
                return medicationRes;
            }
            catch (err) {
                return err;
            }
        });
    }
    static saveMedication(id, medication) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let mediRes = yield PatientModel_1.Patient.updateOne({ _id: id }, {
                    $push: {
                        medication
                    }
                }, { new: true });
                return mediRes;
            }
            catch (err) {
                return err;
            }
        });
    }
    static savePhoto(id, photos) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let photoRes = yield PatientModel_1.Patient.updateOne({ _id: id }, {
                    $push: {
                        photos
                    }
                }, { new: true });
                return photoRes;
            }
            catch (err) {
                return err;
            }
        });
    }
    static getPatientById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let patient = yield PatientModel_1.Patient.findOne({ _id: id });
                return patient;
            }
            catch (err) {
                return err;
            }
        });
    }
    static statusUpdatePS(ids, data, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let statusRes = yield PatientModel_1.Patient.updateOne(Object.assign({}, ids), {
                    $set: Object.assign({}, data)
                }, opts);
                return statusRes;
            }
            catch (err) {
                return err;
            }
        });
    }
    static statusUpdate(id, data, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let statusRes = yield PatientModel_1.Patient.updateOne({ _id: id }, {
                    $set: {
                        status: data.status,
                        statusAt: new Date(),
                        statusBy: data.userId
                    }
                }, opts);
                return statusRes;
            }
            catch (err) {
                return err;
            }
        });
    }
    static getPatientByStatus(st) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { lookup, unwind, project } = yield this.surgeonHelper(st);
                let patient = yield PatientModel_1.Patient.aggregate([
                    {
                        $match: {
                            status: st
                        }
                    },
                    {
                        $lookup: Object.assign({}, lookup)
                    },
                    {
                        $unwind: Object.assign({}, unwind)
                    },
                    {
                        $project: Object.assign({}, project)
                    }
                ]);
                return patient;
            }
            catch (err) {
                return err;
            }
        });
    }
    static getPatientByStatusOp(st) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let patient = yield PatientModel_1.Patient.aggregate([
                    {
                        $match: {
                            status: st
                        }
                    },
                    {
                        $lookup: {
                            from: "operativePlan",
                            localField: "processId",
                            foreignField: "refferId",
                            as: "operativePlan"
                        }
                    },
                    {
                        $unwind: {
                            path: "$operativePlan",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $lookup: {
                            from: "surgon",
                            localField: "processId",
                            foreignField: "refferId",
                            as: "surgon"
                        }
                    },
                    {
                        $unwind: {
                            path: "$surgon",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $addFields: {
                            total: { $add: ["$p3", "$p4", "$surgon.p1", "$surgon.p2"] }
                        }
                    },
                    {
                        $sort: { "total": -1 }
                    },
                    {
                        $project: {
                            "_id": 1,
                            "patientName": 1,
                            "date": 1,
                            "dob": 1,
                            "age": 1,
                            "sex": 1,
                            "patientNumber": 1,
                            "processId": 1,
                            "operativePlanId": { $ifNull: ["$operativePlan._id", 0] },
                            "priority": "$total"
                        }
                    }
                ]);
                return patient;
            }
            catch (err) {
                return err;
            }
        });
    }
    static ProcessCompleted(id, visitId, status, data, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let statusRes = yield PatientModel_1.Patient.updateOne({ _id: id, "visits._id": visitId }, {
                    $set: {
                        status: status,
                        processId: "",
                        statusAt: new Date(),
                        statusBy: data.userId,
                        "visits.$.status": "C"
                    }
                }, opts);
                return statusRes;
            }
            catch (err) {
                return err;
            }
        });
    }
    static surgeonHelper(st) {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            switch (st) {
                case "PL":
                    {
                        data = {
                            lookup: {
                                from: "pediactric",
                                localField: "processId",
                                foreignField: "refferId",
                                as: "pediatrict"
                            },
                            unwind: {
                                path: "$pediatrict",
                                preserveNullAndEmptyArrays: true
                            },
                            project: {
                                "_id": 1,
                                "patientName": 1,
                                "date": 1,
                                "dob": 1,
                                "age": 1,
                                "sex": 1,
                                "patientNumber": 1,
                                "processId": 1,
                                "pediatrictId": { $ifNull: ["$pediatrict._id", 0] }
                            }
                        };
                    }
                    ;
                    break;
                case "SL":
                    {
                        data = {
                            lookup: {
                                from: "surgon",
                                localField: "processId",
                                foreignField: "refferId",
                                as: "surgon"
                            },
                            unwind: {
                                path: "$surgon",
                                preserveNullAndEmptyArrays: true
                            },
                            project: {
                                "_id": 1,
                                "patientName": 1,
                                "date": 1,
                                "dob": 1,
                                "age": 1,
                                "sex": 1,
                                "patientNumber": 1,
                                "processId": 1,
                                "surgonId": { $ifNull: ["$surgon._id", 0] }
                            }
                        };
                    }
                    ;
                    break;
                case "AL":
                    {
                        data = {
                            lookup: {
                                from: "anesthesia",
                                localField: "processId",
                                foreignField: "refferId",
                                as: "anesthesia"
                            },
                            unwind: {
                                path: "$anesthesia",
                                preserveNullAndEmptyArrays: true
                            },
                            project: {
                                "_id": 1,
                                "patientName": 1,
                                "date": 1,
                                "dob": 1,
                                "age": 1,
                                "sex": 1,
                                "patientNumber": 1,
                                "processId": 1,
                                "anesthesiaId": { $ifNull: ["$anesthesia._id", 0] }
                            }
                        };
                    }
                    ;
                    break;
                case "LB":
                    {
                        data = {
                            lookup: {
                                from: "lab",
                                localField: "processId",
                                foreignField: "refferId",
                                as: "lab"
                            },
                            unwind: {
                                path: "$lab",
                                preserveNullAndEmptyArrays: true
                            },
                            project: {
                                "_id": 1,
                                "patientName": 1,
                                "date": 1,
                                "dob": 1,
                                "age": 1,
                                "sex": 1,
                                "patientNumber": 1,
                                "processId": 1,
                                "labId": { $ifNull: ["$lab._id", 0] }
                            }
                        };
                    }
                    ;
                    break;
                case "SA":
                    {
                        data = {
                            lookup: {
                                from: "surgicalAppointment",
                                localField: "processId",
                                foreignField: "refferId",
                                as: "surgicalAppointment"
                            },
                            unwind: {
                                path: "$surgicalAppointment",
                                preserveNullAndEmptyArrays: true
                            },
                            project: {
                                "_id": 1,
                                "patientName": 1,
                                "date": 1,
                                "dob": 1,
                                "age": 1,
                                "sex": 1,
                                "patientNumber": 1,
                                "processId": 1,
                                "surgicalAppointment": { $ifNull: ["$surgicalAppointment._id", 0] }
                            }
                        };
                    }
                    ;
                    break;
                default:
                    null;
                    break;
            }
            return data;
        });
    }
    static getPatientDtlList(id, visitId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let PatientDtlList = yield PatientModel_1.Patient.aggregate([
                    {
                        $match: {
                            "_id": mongoose.Types.ObjectId(id)
                        }
                    },
                    {
                        $unwind: {
                            path: "$visits",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $match: {
                            "visits._id": mongoose.Types.ObjectId(visitId)
                        }
                    },
                    {
                        $lookup: {
                            from: "pediactric",
                            pipeline: [{
                                    $match: {
                                        "refferId": visitId
                                    }
                                }
                            ],
                            as: "pediactric"
                        }
                    },
                    {
                        $unwind: {
                            path: "$pediactric",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $lookup: {
                            from: "surgon",
                            pipeline: [{
                                    $match: {
                                        "refferId": visitId
                                    }
                                }
                            ],
                            as: "surgon"
                        }
                    },
                    {
                        $unwind: {
                            path: "$surgon",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $lookup: {
                            from: "lab",
                            pipeline: [{
                                    $match: {
                                        "refferId": visitId
                                    }
                                }
                            ],
                            as: "lab"
                        }
                    },
                    {
                        $unwind: {
                            path: "$lab",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $lookup: {
                            from: "anesthesia",
                            pipeline: [{
                                    $match: {
                                        "refferId": visitId
                                    }
                                }
                            ],
                            as: "anesthesia"
                        }
                    },
                    {
                        $unwind: {
                            path: "$anesthesia",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $lookup: {
                            from: "surgicalAppointment",
                            pipeline: [{
                                    $match: {
                                        "refferId": visitId
                                    }
                                }
                            ],
                            as: "surgicalAppointment"
                        }
                    },
                    {
                        $unwind: {
                            path: "$surgicalAppointment",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $project: {
                            "_id": 1,
                            "patientName": 1,
                            "date": "2021-04-12",
                            "dob": "2018-04-12",
                            "age": 3,
                            "contactInfo": 1,
                            "sex": "male",
                            "createdBy": 1,
                            "programSite": 1,
                            "status": 1,
                            "notes": 1,
                            "photos": 1,
                            "appointments": 1,
                            "medication": 1,
                            "visits": 1,
                            "general": 1,
                            "patientNumber": 1,
                            "processId": 1,
                            "statusAt": 1,
                            "statusBy": 1,
                            "pediactric": { $ifNull: ["$pediactric", null] },
                            "surgon": { $ifNull: ["$surgon", null] },
                            "lab": { $ifNull: ["$lab", null] },
                            "anesthesia": { $ifNull: ["$anesthesia", null] },
                            "surgicalAppointment": { $ifNull: ["$surgicalAppointment", null] },
                        }
                    }
                ]);
                return PatientDtlList;
            }
            catch (err) {
                return err;
            }
        });
    }
}
exports.default = PatientService;
//# sourceMappingURL=PatientService.js.map