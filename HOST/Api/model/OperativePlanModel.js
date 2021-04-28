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
exports.OperativePlan = void 0;
const mongoose = __importStar(require("mongoose"));
const OperativePlanSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, require: true },
    refferId: { type: String, require: true, index: { unique: true } },
    operationDescription: { type: String, required: true },
    procedure: { type: String, required: true },
    surgeon: { type: String, required: true },
    status: { type: String, required: true },
    caseComplexity: { type: String, required: true },
    instruction: { type: String, required: true },
    additionalNotes: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId },
    createdAt: { type: Date },
    updatedAt: Date
}, {
    versionKey: false
});
OperativePlanSchema.pre("save", function (next) {
    try {
        var operativePlan = this;
        operativePlan.createdAt = new Date();
        next();
    }
    catch (err) {
        return next(err);
    }
});
const OperativePlan = mongoose.model('operativePlan', OperativePlanSchema, "operativePlan");
exports.OperativePlan = OperativePlan;
//# sourceMappingURL=OperativePlanModel.js.map