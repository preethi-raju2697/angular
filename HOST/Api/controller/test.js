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
const PatientModel_1 = require("../model/PatientModel");
var tttt = 0;
class test {
    //
    static pat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userRes = yield (new PatientModel_1.Patient()).save();
                if (userRes.id) {
                    console.log(userRes);
                    return res.status(201).send({ result: "User Created Successfully" });
                }
                else {
                    if (userRes.code == 11000) {
                        console.log("error");
                        return res.status(409).send({ error: "Already Exist", key: userRes.keyValue });
                    }
                    else {
                        console.log("error1");
                        return res.status(409).send({ error: userRes.message });
                    }
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).send(error);
            }
        });
    }
}
exports.default = test;
//# sourceMappingURL=test.js.map