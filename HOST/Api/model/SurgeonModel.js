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
exports.Surgon = void 0;
const mongoose = __importStar(require("mongoose"));
const SurgonSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, require: true },
    refferId: { type: String, require: true, index: { unique: true } },
    syndromicDiagnosis: { type: String, required: true },
    lipDiagnosis: { type: String, required: true },
    palateDiagnosis: { type: String, required: true },
    otherDiagnosis: { type: String, required: true },
    surgicalRec: {
        lip: { type: Boolean, require: true },
        palate: { type: Boolean, require: true },
        other: { type: Boolean, require: true },
        nosurgery: { type: Boolean, require: true, default: false }
    },
    p1: { type: Number, default: 0 },
    p2: { type: Number, default: 0 },
    comments: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId },
    createdAt: { type: Date },
    updatedAt: Date
}, {
    versionKey: false
});
SurgonSchema.pre("save", function (next) {
    try {
        var surgon = this;
        surgon.createdAt = new Date();
        next();
    }
    catch (err) {
        return next(err);
    }
});
const Surgon = mongoose.model('surgon', SurgonSchema, "surgon");
exports.Surgon = Surgon;
//# sourceMappingURL=SurgeonModel.js.map