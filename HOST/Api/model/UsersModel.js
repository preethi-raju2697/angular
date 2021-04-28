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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT_ROUND = 10;
const DoctorSchema = new mongoose.Schema({
    camp: String,
    specialist: Number
});
const UserSchema = new mongoose.Schema({
    roleId: { type: Number, required: true, ref: 'role', enum: [1, 2, 3] },
    firstName: { type: String, required: true },
    middleName: String,
    lastName: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    dob: { type: String, required: true },
    address: { type: String },
    docterDetail: DoctorSchema,
    staffDetail: { type: Object },
    createdAt: { type: Date },
    updatedAt: Date
}, {
    versionKey: false
});
//Perform operation before save 
UserSchema.pre("save", function (next) {
    try {
        var user = this;
        user.createdAt = new Date();
        bcrypt_1.default.genSalt(SALT_ROUND, function (err, salt) {
            if (err)
                return next(err);
            bcrypt_1.default.hash(user.password, salt, function (err, hash) {
                if (err)
                    return next(err);
                user.password = hash;
                next();
            });
        });
    }
    catch (err) {
        return next(err);
    }
});
const User = mongoose.model('user', UserSchema, "user");
exports.User = User;
//# sourceMappingURL=UsersModel.js.map