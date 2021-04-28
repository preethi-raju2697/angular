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
const SurgicalAppointmentModel_1 = require("../model/SurgicalAppointmentModel");
class SurgicalAppointmentService {
    static saveSA(sa) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (new SurgicalAppointmentModel_1.SurgicalAppointment(sa)).save();
            }
            catch (err) {
                return err;
            }
        });
    }
    static updateSA(id, sa) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let updateSA = yield SurgicalAppointmentModel_1.SurgicalAppointment.updateOne({ _id: id }, {
                    $set: Object.assign({}, sa)
                }, { new: true });
                return updateSA;
            }
            catch (err) {
                return err;
            }
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let surgicalAppointment = yield SurgicalAppointmentModel_1.SurgicalAppointment.findOne({ _id: id });
                return surgicalAppointment;
            }
            catch (err) {
                return err;
            }
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let surgicalAppointment = yield SurgicalAppointmentModel_1.SurgicalAppointment.aggregate([
                    {
                        $lookup: {
                            from: "patient",
                            localField: "patientId",
                            foreignField: "_id",
                            as: "patient"
                        }
                    },
                    {
                        $unwind: "$patient"
                    },
                    {
                        $addFields: {
                            startDate: {
                                $function: {
                                    body: function (date, st, allday) {
                                        let dateString = date;
                                        let str;
                                        if (allday) {
                                            str = dateString.substring(0, 4) + "-" + dateString.substring(5, 7) + "-" + dateString.substring(8, 10);
                                        }
                                        else {
                                            str = dateString.substring(0, 4) + "-" + dateString.substring(5, 7) + "-" + dateString.substring(8, 10) + "T" + st + ":00";
                                        }
                                        return str;
                                    },
                                    args: ["$date", "$startTime", "$allDay"],
                                    lang: "js"
                                }
                            },
                            endDate: {
                                $function: {
                                    body: function (date, et, allday) {
                                        let dateString = date;
                                        let str;
                                        if (allday) {
                                            str = dateString.substring(0, 4) + "-" + dateString.substring(5, 7) + "-" + dateString.substring(8, 10);
                                        }
                                        else {
                                            str = dateString.substring(0, 4) + "-" + dateString.substring(5, 7) + "-" + dateString.substring(8, 10) + "T" + et + ":00";
                                        }
                                        return str;
                                    },
                                    args: ["$date", "$endTime", "$allDay"],
                                    lang: "js"
                                }
                            }
                        }
                    },
                    {
                        $project: {
                            "_id": 0,
                            "id": "$_id",
                            "title": { $concat: ["$patient.patientName", " - ", "$doctor"] },
                            "date": 1,
                            "start": "$startDate",
                            "end": "$endDate",
                            "allDay": 1
                        }
                    }
                ]);
                return surgicalAppointment;
            }
            catch (err) {
                return err;
            }
        });
    }
    static checkTimeExist(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let checkExist = yield SurgicalAppointmentModel_1.SurgicalAppointment.find({
                    hospitalId: data.hospitalId, theaterId: data.theaterId,
                    date: data.date, $or: [{
                            $and: [
                                { startTime: { $gte: data.startTime } }, { endTime: { $lte: data.endTime } }
                            ]
                        },
                        {
                            $and: [
                                { startTime: { $lte: data.endTime } }, { endTime: { $gte: data.startTime } }
                            ]
                        }]
                });
                return checkExist;
            }
            catch (err) {
                return err;
            }
        });
    }
    static getTheaterScheduleById(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let checkExist = yield SurgicalAppointmentModel_1.SurgicalAppointment.find({
                    hospitalId: data.hospitalId,
                    theaterId: data.theaterId,
                    date: data.date
                });
                return checkExist;
            }
            catch (err) {
                return err;
            }
        });
    }
}
exports.default = SurgicalAppointmentService;
//# sourceMappingURL=SurgicalAppointmentService.js.map