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
Object.defineProperty(exports, "__esModule", { value: true });
const UsersModel_1 = require("../model/UsersModel");
class UserService {
    //Save user
    static saveUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (new UsersModel_1.User(user)).save();
            }
            catch (err) {
                return err;
            }
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map