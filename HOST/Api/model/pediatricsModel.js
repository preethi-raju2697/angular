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
exports.Pediactric = void 0;
const mongoose = __importStar(require("mongoose"));
const PediactricSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, require: true },
    refferId: { type: String, require: true, index: { unique: true } },
    PediactricType: { type: String, required: true },
    objective: { type: String, required: true },
    heent: { type: String, required: true },
    oralCare: { type: String, required: true },
    cl: { type: String, required: true },
    heart: { type: String, required: true },
    ge: { type: String, required: true },
    musculoSkeletal: { type: String },
    gu: { type: String, required: true },
    extremitiesSkin: { type: String, required: true },
    others: { type: String },
    comments: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId },
    createdAt: { type: Date },
    updatedAt: Date
}, {
    versionKey: false
});
PediactricSchema.pre("save", function (next) {
    try {
        var pediactric = this;
        pediactric.createdAt = new Date();
        next();
    }
    catch (err) {
        return next(err);
    }
});
const Pediactric = mongoose.model('pediactric', PediactricSchema, "pediactric");
exports.Pediactric = Pediactric;
//# sourceMappingURL=pediatricsModel.js.map