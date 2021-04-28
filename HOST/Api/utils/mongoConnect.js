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
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
class Mongo {
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield new Promise((resolve, reject) => {
                    mongoose_1.default.connect(config_1.config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
                    const connection = mongoose_1.default.connection;
                    connection.on("open", () => {
                        resolve(true);
                    });
                    connection.on("error", e => {
                        reject(false);
                    });
                });
            }
            catch (_a) {
                return false;
            }
        });
    }
}
exports.default = Mongo;
//# sourceMappingURL=mongoConnect.js.map