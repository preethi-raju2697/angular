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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
var crypto = require('crypto');
class Auth {
    static comparePassword(candidatePassword, password, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                bcrypt_1.default.compare(candidatePassword, password, function (err, isMatch) {
                    if (err)
                        return cb(err);
                    resolve(isMatch);
                });
            });
        });
    }
    static generateAccessToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //encrypt payload data
                let cryptoStr = yield this.encrypt(user);
                return yield jsonwebtoken_1.default.sign({ data: cryptoStr }, config_1.config.jwtSecret);
            }
            catch (_a) {
                throw new Error();
            }
        });
    }
    static authorizationToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authHeader = req.headers['authorization'];
                const tknType = authHeader && authHeader.split(' ')[0];
                if (tknType != "Bearer")
                    return res.status(401).send({ message: "Unauthorized token type Invalid" });
                const token = authHeader && authHeader.split(' ')[1];
                if (token == null)
                    return res.status(401).send({ message: "Unauthorized" });
                jsonwebtoken_1.default.verify(token, config_1.config.jwtSecret, (err, user) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        return res.status(403).send({ message: "AccessToken Not Valid Forbidden" });
                    req.user = yield Auth.decrypt(user.data);
                    next();
                }));
            }
            catch (err) {
                throw new Error("Server Error");
            }
        });
    }
    static encrypt(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userStr = JSON.stringify(user);
                let buff = Buffer.from(userStr, "utf8");
                let base64data = buff.toString('base64');
                var crpytoRes = crypto.createCipher('aes-128-cbc', config_1.config.cryptoSecret);
                var cryptoStr = crpytoRes.update(base64data, 'utf8', 'hex');
                cryptoStr += crpytoRes.final('hex');
                return cryptoStr;
            }
            catch (_a) {
                throw new Error();
            }
        });
    }
    static decrypt(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var mykey = crypto.createDecipher('aes-128-cbc', config_1.config.cryptoSecret);
                var mystr = mykey.update(data, 'hex', 'utf8');
                mystr += mykey.final('utf8');
                let buff = Buffer.from(mystr, "base64");
                let text = buff.toString("utf8");
                return JSON.parse(text);
            }
            catch (_a) {
                throw new Error();
            }
        });
    }
}
exports.default = Auth;
//# sourceMappingURL=Auth.js.map