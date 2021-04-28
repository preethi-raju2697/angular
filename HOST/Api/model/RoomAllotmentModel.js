"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomAllotment = void 0;
const mongoose = __importStar(require("mongoose"));
const RoomAllotmentSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, require: true },
    hospitalName: { type: String, required: true },
    admitDate: { type: Date, required: true },
    dischargeDate: { type: Date },
    location: { type: String, required: true },
    roomNo: { type: String, required: true },
    roomType: { type: String },
    bedNo: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId },
    createdAt: { type: Date },
    updatedAt: Date
}, {
    versionKey: false
});
RoomAllotmentSchema.pre("save", function (next) {
    try {
        var roomAllotment = this;
        roomAllotment.createdAt = new Date();
        next();
    }
    catch (err) {
        return next(err);
    }
});
const RoomAllotment = mongoose.model('roomAllotmentSchema', RoomAllotmentSchema, "roomAllotmentSchema");
exports.RoomAllotment = RoomAllotment;
//# sourceMappingURL=RoomAllotmentModel.js.map