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
var pdf = require("pdf-creator-node");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let i = 0;
class ReportController {
    static report(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                i++;
                let html = fs.readFileSync("./htmlTemplate/report.html", "utf8");
                var options = {
                    format: "A4",
                    orientation: "portrait",
                };
                var users = [
                    {
                        name: "Shyam",
                        age: "26",
                    },
                    {
                        name: "Navjot",
                        age: "26",
                    },
                    {
                        name: "Vitthal",
                        age: "26",
                    },
                    {
                        name: "kjhjk",
                        age: "26",
                    }
                ];
                var document = {
                    html: html,
                    data: {
                        users: users,
                    },
                    path: "./reports/" + i + "rep.pdf",
                    type: "",
                };
                pdf.create(document, options)
                    .then((data) => {
                    console.log(data);
                    var options = {
                        root: path.join(__dirname + "./reports/")
                    };
                    let fileName = data.filename;
                    return res.download(fileName, function (err) {
                        if (err) {
                            console.log("error", err);
                        }
                        else {
                            console.log('Sent:', fileName);
                            fs.unlinkSync(fileName);
                        }
                    });
                })
                    .catch((error) => {
                    console.error(error);
                });
            }
            catch (err) {
                return res.status(500).send(err);
            }
        });
    }
}
exports.default = ReportController;
//# sourceMappingURL=ReportController.js.map