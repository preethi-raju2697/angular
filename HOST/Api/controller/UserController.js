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
const UserService_1 = __importDefault(require("../service/UserService"));
class UserController {
    static saveUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = req.body;
                if (!user.roleId)
                    return res.status(400).send({ error: "role required" });
                if (!user.firstName)
                    return res.status(400).send({ error: "firstname Required" });
                if (!user.lastName)
                    return res.status(400).send({ error: "lastName required" });
                if (!user.mobile)
                    return res.status(400).send({ error: "phoneNumber required" });
                if (!user.email)
                    return res.status(400).send({ error: "email required" });
                if (!user.password)
                    return res.status(400).send({ error: "password required" });
                if (!user.address)
                    return res.status(400).send({ error: "address required" });
                let userRes = yield UserService_1.default.saveUser(user);
                if (userRes.id) {
                    return res.status(201).send({ result: "User Created Successfully" });
                }
                else {
                    if (userRes.code == 11000) {
                        return res.status(409).send({ error: "Already Exist", key: userRes.keyValue });
                    }
                    else {
                        return res.status(409).send({ error: userRes.message });
                    }
                }
            }
            catch (err) {
                return res.status(500).send({ error: "Server Error Please Try Again Later" });
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map