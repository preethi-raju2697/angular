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
const RoomAllotmentService_1 = __importDefault(require("../service/RoomAllotmentService"));
class RoomAllotmentController {
    static save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let RoomAllot = req.body;
                RoomAllot["createdBy"] = req.user._id;
                if (!RoomAllot.patientId)
                    return res.status(400).send({ error: "patientId required" });
                if (!RoomAllot.hospitalName)
                    return res.status(400).send({ error: "hospitalName required" });
                if (!RoomAllot.admitDate)
                    return res.status(400).send({ error: "admitDate required" });
                if (!RoomAllot.location)
                    return res.status(400).send({ error: "location required" });
                if (!RoomAllot.roomNo)
                    return res.status(400).send({ error: "roomNo required" });
                let AllotmentRes = yield RoomAllotmentService_1.default.save(RoomAllot);
                if (AllotmentRes.id) {
                    return res.status(201).send({ result: "RoomAllotment  Successfully" });
                }
                else {
                    return res.status(409).send({ error: AllotmentRes.message });
                }
            }
            catch (err) {
                return res.status(500).send({ error: err.message });
            }
        });
    }
    static getAllRooms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let AllotmentRes = yield RoomAllotmentService_1.default.getAll();
                if (AllotmentRes.length != 0) {
                    return res.status(201).send({ result: AllotmentRes });
                }
                else {
                    return res.status(201).send({ result: {} });
                }
            }
            catch (err) {
                return res.status(500).send({ error: err.message });
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                if (!id)
                    return res.status(400).send({ error: "id required" });
                let room = yield RoomAllotmentService_1.default.getById(id);
                if (room) {
                    return res.status(200).send({ result: room });
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
exports.default = RoomAllotmentController;
//# sourceMappingURL=RoomAllotmentController.js.map