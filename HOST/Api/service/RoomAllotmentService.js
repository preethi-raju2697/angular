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
const RoomAllotmentModel_1 = require("../model/RoomAllotmentModel");
class RoomAllotmentService {
    static save(ra) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (new RoomAllotmentModel_1.RoomAllotment(ra)).save();
            }
            catch (err) {
                return err;
            }
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let RoomAllotments = yield RoomAllotmentModel_1.RoomAllotment.aggregate([
                    {
                        $lookup: {
                            from: "patient",
                            localField: "patientId",
                            foreignField: "_id",
                            as: "patient"
                        }
                    },
                    {
                        $unwind: {
                            path: "$patient"
                        }
                    },
                    {
                        $project: {
                            "_id": 1,
                            "patientId": "$patient._id",
                            "patientName": "$patient.patientName",
                            "date": "$patient.date",
                            "dob": "$patient.dob",
                            "age": "$patient.age",
                            "sex": "$patient.sex",
                            "patientNumber": "$patient.patientNumber",
                        }
                    }
                ]);
                return RoomAllotments;
            }
            catch (err) {
                return err;
            }
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let RoonAllot = yield RoomAllotmentModel_1.RoomAllotment.findOne({ _id: id });
                return RoonAllot;
            }
            catch (err) {
                return err;
            }
        });
    }
}
exports.default = RoomAllotmentService;
//# sourceMappingURL=RoomAllotmentService.js.map