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
class Common {
    static dateCalc(dateString) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var now = new Date();
                // var today = new Date(now.getYear(), now.getMonth(), now.getDate());
                var yearNow = now.getYear();
                var monthNow = now.getMonth();
                var dateNow = now.getDate();
                var dob = new Date(dateString.substring(0, 4), dateString.substring(5, 7) - 1, dateString.substring(8, 10));
                var yearDob = dob.getYear();
                var monthDob = dob.getMonth();
                var dateDob = dob.getDate();
                let yearAge = yearNow - yearDob;
                if (monthNow >= monthDob)
                    var monthAge = monthNow - monthDob;
                else {
                    yearAge--;
                    var monthAge = 12 + monthNow - monthDob;
                }
                if (dateNow >= dateDob)
                    var dateAge = dateNow - dateDob;
                else {
                    monthAge--;
                    var dateAge = 31 + dateNow - dateDob;
                    if (monthAge < 0) {
                        monthAge = 11;
                        yearAge--;
                    }
                }
                let age = {
                    years: yearAge,
                    months: monthAge,
                    days: dateAge
                };
                return age;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.default = Common;
//# sourceMappingURL=Common.js.map