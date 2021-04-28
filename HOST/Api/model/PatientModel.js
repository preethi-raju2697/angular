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
exports.Patient = void 0;
const mongoose = __importStar(require("mongoose"));
const SequenceModel = new mongoose.Schema({
    key: { type: String, required: true, index: { unique: true } },
    seq: { type: Number, default: 100 }
});
class Helper {
    static getuniqueId(keyName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let seqVal = yield Seq.findOne({ key: keyName });
                if (!seqVal)
                    seqVal = yield new Seq({ key: keyName }).save();
                seqVal.seq++;
                let id = yield Seq.findOneAndUpdate({ key: keyName }, { $set: { seq: seqVal.seq } }, { new: true });
                if (id.seq) {
                    return seqVal.seq;
                }
                else {
                    throw new Error("patient Sequence Duplicate");
                }
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.default = Helper;
const ContactInfoSchema = new mongoose.Schema({
    accompinedBy: { type: String, require: true },
    relationship: { type: String, require: true },
    motherName: { type: String, require: true },
    fatherName: { type: String, require: true },
    address: { type: String, require: true },
    city: { type: String, require: true },
    state: { type: String, require: true },
    postalCode: { type: String, require: true },
    landMark: { type: String, require: true },
    distanceTravelled: { type: Number, require: true },
    travelledBy: { type: String, require: true },
    email: { type: String, require: true, index: { unique: true } },
    accomodation: { type: Boolean, require: true }
});
const PatientSchema = new mongoose.Schema({
    patientNumber: { type: String, require: true, index: { unique: true } },
    patientName: { type: String, require: true },
    date: { type: String, require: true },
    dob: { type: String, require: true },
    age: { type: Number, require: true },
    sex: { type: String, require: true },
    programSite: { type: String, require: true },
    contactInfo: { type: ContactInfoSchema, require: true },
    p3: { type: Number, default: 0 },
    p4: { type: Number, default: 0 },
    status: { type: String },
    processId: { type: String },
    statusAt: { type: Date },
    statusBy: { type: mongoose.Schema.Types.ObjectId },
    proof: {
        proofName: { type: String },
        proofId: { type: String }
    },
    phone: {
        fatherMobile: { type: String },
        motherMobile: { type: String },
        otherMobile: { type: String },
        fatherWA: { type: Boolean, default: false },
        motherWA: { type: Boolean, default: false },
        otherWA: { type: Boolean, default: false }
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, require: true },
    notes: [{
            previousSurgery: { type: Boolean, required: true },
            previousSurgeryNote: { type: String },
            cold: { type: Boolean, required: true },
            coldNote: { type: String },
            cyanosis: { type: Boolean, required: true },
            cyanosisNote: { type: String },
            bleeding: { type: Boolean, required: true },
            bleedingNote: { type: String },
            breathing: { type: Boolean, required: true },
            breathingNote: { type: String },
            currentMedicine: { type: String },
            drug: { type: Boolean },
            drugNote: { type: String },
            immunization: { type: Boolean, required: true },
            createdBy: { type: mongoose.Schema.Types.ObjectId },
            createdAt: { type: Date, default: new Date() },
            updatedBy: { type: mongoose.Schema.Types.ObjectId },
            updatedAt: { type: Date }
        }],
    general: {
        firstName: { type: String },
        middleName: { type: String },
        lastName: { type: String },
        sex: { type: String },
        dob: { type: String },
        patientStatus: { type: String },
        externalPatientId: { type: String },
        blood: { type: String },
        clinicSite: { type: String },
        refferedBy: { type: String },
        refferedDate: { type: String },
        createdBy: { type: mongoose.Schema.Types.ObjectId },
        createdAt: { type: Date }
    },
    photos: [
        {
            name: { type: String },
            filename: { type: String },
            description: { type: String },
            createdBy: { type: mongoose.Schema.Types.ObjectId },
            createdAt: { type: Date }
        }
    ],
    appointments: [
        {
            startDate: { type: Date },
            endDate: { type: Date },
            with: { type: String },
            location: { type: String },
            status: { type: String },
            notes: { type: String },
            type: { type: String },
            allDay: { type: Boolean },
            createdBy: { type: mongoose.Schema.Types.ObjectId },
            createdAt: { type: Date }
        }
    ],
    medication: [{
            medication: { type: String },
            prescription: { type: String },
            prescriptiondate: { type: Date },
            quantity: { type: Number },
            refills: { type: String },
            billto: { type: String },
            createdBy: { type: mongoose.Schema.Types.ObjectId },
            createdAt: { type: Date }
        }],
    visits: [
        {
            date: { type: Date },
            dischargeDate: { type: Date },
            location: { type: String },
            visitType: { type: String },
            examiner: { type: String },
            reason: { type: String },
            subjective: { type: String },
            objective: { type: String },
            assessment: { type: String },
            plan: { type: String },
            status: { type: String, default: "N", enum: ["N", "P", "C"] },
            scan: [
                {
                    scanName: { type: String },
                    description: { type: String },
                    name: { type: String },
                    fileName: { type: String },
                    createdAt: { type: Date },
                    createdBy: { type: mongoose.Schema.Types.ObjectId }
                }
            ],
            vitals: [{
                    recordDate: { type: Date },
                    tempType: { type: String, enum: ["F", "C"] },
                    temperature: { type: Number },
                    weightType: { type: String, enum: ["K", "P"] },
                    weight: { type: Number },
                    heightType: { type: String, enum: ["C", "I"] },
                    height: { type: Number },
                    bp: { type: Number },
                    osat: { type: Number },
                    heartRate: { type: Number },
                    respiratoryRate: { type: Number },
                    createdBy: { type: mongoose.Schema.Types.ObjectId },
                    createdAt: { type: Date }
                }],
            notes: [{
                    note: { type: String },
                    onBehalfOf: { type: String },
                    createdBy: { type: mongoose.Schema.Types.ObjectId },
                    createdAt: { type: Date }
                }],
            procedures: [{
                    procedure: { type: String },
                    cptCode: { type: String },
                    procedurelocation: { type: String },
                    proceduredate: { type: String },
                    timeStarted: { type: Date },
                    timeEnded: { type: Date },
                    physician: { type: String },
                    assistant: { type: String },
                    anesthesiologist: { type: String },
                    anesthesiaType: { type: String },
                    notes: { type: String },
                    chargeItem: [{
                            item: { type: String },
                            quantity: { type: Number },
                            dateCharged: { type: Date },
                            createdAt: { type: Date },
                            createdBy: { type: mongoose.Schema.Types.ObjectId }
                        }],
                    medication: [{
                            medication: { type: String },
                            quantity: { type: Number },
                            createdAt: { type: Date },
                            createdBy: { type: mongoose.Schema.Types.ObjectId }
                        }],
                    createdAt: { type: Date },
                    createdBy: { type: mongoose.Schema.Types.ObjectId }
                }],
            charges: [],
            createdBy: { type: mongoose.Schema.Types.ObjectId },
            cteatedAt: { type: Date }
        }
    ],
    createdAt: { type: Date }
}, {
    versionKey: false
});
PatientSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        let Patient = this;
        const id = yield Helper.getuniqueId('seqIndex');
        if (id) {
            let year = new Date();
            Patient.patientNumber = `LWR${year.getFullYear()}${year.getMonth()}` + id; // Incremented
            Patient.processId = "";
            next();
        }
        else {
            next(id);
        }
    });
});
const Seq = mongoose.model('seq', SequenceModel, "seq");
const Patient = mongoose.model('patient', PatientSchema, "patient");
exports.Patient = Patient;
//# sourceMappingURL=PatientModel.js.map