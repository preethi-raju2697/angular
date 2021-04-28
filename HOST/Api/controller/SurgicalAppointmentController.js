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
const SurgicalAppointmentService_1 = __importDefault(require("../service/SurgicalAppointmentService"));
const PatientService_1 = __importDefault(require("../service/PatientService"));
class SurgicalAppointmentController {
    static save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let surgicalAppointment = req.body;
                surgicalAppointment["createdBy"] = req.user._id;
                if (!surgicalAppointment.patientId)
                    return res.status(400).send({ error: "patientId required" });
                if (!surgicalAppointment.date)
                    return res.status(400).send({ error: "date required" });
                if (!surgicalAppointment.hospitalId)
                    return res.status(400).send({ error: "hospitalId required" });
                if (!surgicalAppointment.theaterId)
                    return res.status(400).send({ error: "theaterId required" });
                if (surgicalAppointment.allDay) {
                    surgicalAppointment.startTime = "00:00";
                    surgicalAppointment.endTime = "23:59";
                }
                if (surgicalAppointment.startTime > surgicalAppointment.endTime)
                    return res.status(400).send({ error: "starttime is greater than endtime required" });
                let user = yield PatientService_1.default.getPatientById(surgicalAppointment.patientId);
                if (user) {
                    if (user.status == "SA") {
                        let checkTimeExist = yield SurgicalAppointmentService_1.default.checkTimeExist(surgicalAppointment);
                        if (checkTimeExist.length == 0) {
                            surgicalAppointment.refferId = user.processId;
                            if (!surgicalAppointment.refferId)
                                return res.status(404).send({ error: "processId not found" });
                            let saRes = yield SurgicalAppointmentService_1.default.saveSA(surgicalAppointment);
                            if (saRes.id) {
                                return res.status(201).send({ result: "SurgicalAppointment Created Successfully" });
                            }
                            else {
                                if (saRes.code == 11000) {
                                    return res.status(409).send({ error: "Already Exist", key: saRes.keyValue });
                                }
                                else {
                                    return res.status(409).send({ error: saRes.message });
                                }
                            }
                        }
                        else {
                            return res.status(409).send({ error: "Schedule Already Exist for this time period" });
                        }
                    }
                    else {
                        return res.status(400).send({ error: "User not moved to SurgicalAppointment" });
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
    static updateSA(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let surgicalAppointment = req.body;
                if (!surgicalAppointment.id)
                    return res.status(400).send({ error: "id required" });
                if (!surgicalAppointment.patientId)
                    return res.status(400).send({ error: "patientId required" });
                if (!surgicalAppointment.date)
                    return res.status(400).send({ error: "date required" });
                if (!surgicalAppointment.hospitalId)
                    return res.status(400).send({ error: "hospitalId required" });
                if (!surgicalAppointment.theaterId)
                    return res.status(400).send({ error: "theaterId required" });
                if (surgicalAppointment.allDay) {
                    surgicalAppointment.startTime = "00:00";
                    surgicalAppointment.endTime = "23:59";
                }
                if (surgicalAppointment.startTime > surgicalAppointment.endTime)
                    return res.status(400).send({ error: "starttime is greater than endtime required" });
                let user = yield PatientService_1.default.getPatientById(surgicalAppointment.patientId);
                let updateData = {
                    hospitalId: surgicalAppointment.hospitalId,
                    theaterId: surgicalAppointment.theaterId,
                    date: surgicalAppointment.date,
                    startTime: surgicalAppointment.startTime,
                    endTime: surgicalAppointment.endTime,
                    allDay: surgicalAppointment.allDay,
                    doctor: surgicalAppointment.doctor,
                    location: surgicalAppointment.location,
                    notes: surgicalAppointment.notes,
                    updatedAt: new Date(),
                    updatedBy: req.user._id
                };
                if (user) {
                    if (user.status == "SA") {
                        let checkTimeExist = yield SurgicalAppointmentService_1.default.checkTimeExist(surgicalAppointment);
                        if (checkTimeExist.length == 0) {
                            let saRes = yield SurgicalAppointmentService_1.default.updateSA(surgicalAppointment.id, updateData);
                            if (saRes.nModified == 1) {
                                return res.status(201).send({ result: "SurgicalAppointment Updated Successfully" });
                            }
                            else {
                                if (saRes.code == 11000) {
                                    return res.status(409).send({ error: "Already Exist", key: saRes.keyValue });
                                }
                                else {
                                    return res.status(409).send({ error: saRes.message });
                                }
                            }
                        }
                        else {
                            let checkAlreayExist = yield checkTimeExist.find(s => s.id == surgicalAppointment.id);
                            if (checkAlreayExist && checkTimeExist.length == 1) {
                                let saRes = yield SurgicalAppointmentService_1.default.updateSA(surgicalAppointment.id, updateData);
                                if (saRes.nModified == 1) {
                                    return res.status(201).send({ result: "SurgicalAppointment Updated Successfully" });
                                }
                                else {
                                    if (saRes.code == 11000) {
                                        return res.status(409).send({ error: "Already Exist", key: saRes.keyValue });
                                    }
                                    else {
                                        return res.status(409).send({ error: saRes.message });
                                    }
                                }
                            }
                            else {
                                return res.status(409).send({ error: "Schedule Already Exist for this time period or Not Exist" });
                            }
                        }
                    }
                    else {
                        return res.status(400).send({ error: "User not moved to SurgicalAppointment" });
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
                    status: "SA",
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
    static getSurgicalAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let surgicalAppontment = yield PatientService_1.default.getPatientByStatus("SA");
                if (surgicalAppontment.length != 0) {
                    return res.status(200).send({ result: surgicalAppontment });
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
    static getSAById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                if (!id)
                    return res.status(400).send({ error: "id required" });
                let saRes = yield SurgicalAppointmentService_1.default.getById(id);
                if (saRes) {
                    return res.status(200).send({ result: saRes });
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
    static processCompleted(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let statusBdy = req.body;
                if (!statusBdy.id)
                    return res.status(400).send({ error: "id required" });
                if (!statusBdy.visitId)
                    return res.status(400).send({ error: "visitId required" });
                if (!statusBdy.status)
                    return res.status(400).send({ error: "status required" });
                let data = {
                    userId: req.user._id
                };
                let statusRes = yield PatientService_1.default.ProcessCompleted(statusBdy.id, statusBdy.visitId, statusBdy.status, data, { new: true });
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
    static getTheaterSchudule(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let saRes = yield SurgicalAppointmentService_1.default.getAll();
                if (saRes.length != 0) {
                    return res.status(200).send({ result: saRes });
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
    static getTheaterScheduleByIds(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let dta = req.body;
                if (!dta.id)
                    return res.status(400).send({ error: "id required" });
                if (!dta.visitId)
                    return res.status(400).send({ error: "visitId required" });
                if (!dta.status)
                    return res.status(400).send({ error: "status required" });
                let surgicalAppontment = yield SurgicalAppointmentService_1.default.getTheaterScheduleById(dta);
                if (surgicalAppontment.length != 0) {
                    return res.status(200).send({ result: surgicalAppontment });
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
}
exports.default = SurgicalAppointmentController;
//# sourceMappingURL=SurgicalAppointmentController.js.map