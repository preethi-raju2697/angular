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
exports.SurgicalAppointment = void 0;
const mongoose = __importStar(require("mongoose"));
const SurgicalAppointmentSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, require: true },
    hospitalId: { type: String, require: true },
    theaterId: { type: String, require: true },
    refferId: { type: String, require: true, index: { unique: true } },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    allDay: { type: Boolean, required: true },
    doctor: { type: String, required: true },
    location: { type: String, required: true },
    status: { type: String },
    notes: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId },
    createdAt: { type: Date },
    updatedBy: { type: mongoose.Schema.Types.ObjectId },
    updatedAt: Date
}, {
    versionKey: false
});
SurgicalAppointmentSchema.pre("save", function (next) {
    try {
        var SurgicalAppointment = this;
        SurgicalAppointment.createdAt = new Date();
        next();
    }
    catch (err) {
        return next(err);
    }
});
const SurgicalAppointment = mongoose.model('surgicalAppointment', SurgicalAppointmentSchema, "surgicalAppointment");
exports.SurgicalAppointment = SurgicalAppointment;
//# sourceMappingURL=SurgicalAppointmentModel.js.map