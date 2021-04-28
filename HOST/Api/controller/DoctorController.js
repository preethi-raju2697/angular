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
const DoctorService_1 = __importDefault(require("../service/DoctorService"));
class DoctorController {
    static getAllDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let dcList = yield DoctorService_1.default.getAllDoctor();
                return res.status(200).send({ result: dcList });
            }
            catch (err) {
                return res.status(500).send({ error: "Server Error Please Try Again Later" });
            }
        });
    }
}
exports.default = DoctorController;
//# sourceMappingURL=DoctorController.js.map