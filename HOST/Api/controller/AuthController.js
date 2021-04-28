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
const AuthService_1 = __importDefault(require("../service/AuthService"));
const Auth_1 = __importDefault(require("../utils/Auth"));
class AuthController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let auth = req.body;
                if (!auth.email)
                    return res.status(400).send({ error: "email required" });
                if (!auth.password)
                    return res.status(400).send({ error: "password Required" });
                let authRes = yield AuthService_1.default.auth(auth);
                if (authRes) {
                    var UserDta = {
                        _id: authRes.id,
                        roleId: authRes.roleId,
                        email: authRes.email,
                        firstName: authRes.firstName,
                        mobile: authRes.mobile,
                        date: new Date()
                    };
                    let token = yield Auth_1.default.generateAccessToken(UserDta);
                    return res.status(200).send({ token });
                }
                else {
                    return res.status(404).send({ error: "Username or Password Wrong" });
                }
            }
            catch (err) {
                return res.status(500).send({ error: "Server Error Please Try Again Later" });
            }
        });
    }
    static dc(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(200).send(yield Auth_1.default.decrypt(req.params.id));
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map