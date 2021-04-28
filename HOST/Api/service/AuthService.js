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
const UsersModel_1 = require("../model/UsersModel");
const Auth_1 = __importDefault(require("../utils/Auth"));
class AuthService {
    static auth(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield new Promise(function (resolve, reject) {
                    return __awaiter(this, void 0, void 0, function* () {
                        let UserRes = yield UsersModel_1.User.findOne({ email: user.email }).exec();
                        if (UserRes) {
                            var istrue = yield Auth_1.default.comparePassword(user.password, UserRes.password, function (err, isMatch) {
                                if (err)
                                    throw err;
                            });
                            if (istrue) {
                                resolve(UserRes);
                            }
                            else {
                                resolve(null);
                            }
                        }
                        else {
                            resolve(null);
                        }
                    });
                });
            }
            catch (err) {
                return err;
            }
        });
    }
}
exports.default = AuthService;
//# sourceMappingURL=AuthService.js.map