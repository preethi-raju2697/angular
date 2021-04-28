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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express = __importStar(require("express"));
const multer_1 = __importDefault(require("multer"));
const Auth_1 = __importDefault(require("../utils/Auth"));
const AuthController_1 = __importDefault(require("../controller/AuthController"));
const UserController_1 = __importDefault(require("../controller/UserController"));
const DoctorController_1 = __importDefault(require("../controller/DoctorController"));
const PatientController_1 = __importDefault(require("../controller/PatientController"));
const PediatricsController_1 = __importDefault(require("../controller/PediatricsController"));
const SurgeonController_1 = __importDefault(require("../controller/SurgeonController"));
const AnesthesiaController_1 = __importDefault(require("../controller/AnesthesiaController"));
const OperativePlanController_1 = __importDefault(require("../controller/OperativePlanController"));
const SurgicalAppointmentController_1 = __importDefault(require("../controller/SurgicalAppointmentController"));
const RoomAllotmentController_1 = __importDefault(require("../controller/RoomAllotmentController"));
const LabController_1 = __importDefault(require("../controller/LabController"));
const HospitalController_1 = __importDefault(require("../controller/HospitalController"));
// import ReportController from "../controller/ReportController";
const routes = express.Router({ caseSensitive: true });
exports.routes = routes;
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/photos');
    },
    filename: function (req, file, cb) {
        let filename = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2) + "." + file.originalname.split('.').pop();
        cb(null, filename);
    }
});
const upload = multer_1.default({ storage: storage });
const storage1 = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/labs');
    },
    filename: function (req, file, cb) {
        let filename = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2) + "." + file.originalname.split('.').pop();
        cb(null, filename);
    }
});
const upload1 = multer_1.default({ storage: storage1 });
const storage2 = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/procedure');
    },
    filename: function (req, file, cb) {
        let filename = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2) + "." + file.originalname.split('.').pop();
        cb(null, filename);
    }
});
const upload2 = multer_1.default({ storage: storage2 });
//routes.get('/pat', testcon.pat);
//AuthController
routes.post('/login', AuthController_1.default.login);
routes.get('/dec/:id', AuthController_1.default.dc);
//routes.get("/report",ReportController.report)
//AuthController End
//UserController 
routes.post('/register', UserController_1.default.saveUser);
//UserController End
//DoctorController 
routes.get('/getalldoctorlist', Auth_1.default.authorizationToken, DoctorController_1.default.getAllDoctor);
//DoctorController End
//PatientController
routes.post('/addpatient', Auth_1.default.authorizationToken, PatientController_1.default.savePatient);
routes.get('/getallpatient', Auth_1.default.authorizationToken, PatientController_1.default.getAllPatient);
routes.post('/addnotes', Auth_1.default.authorizationToken, PatientController_1.default.saveNotes);
routes.post('/addgeneral', Auth_1.default.authorizationToken, PatientController_1.default.saveGeneral);
routes.post('/addappointment', Auth_1.default.authorizationToken, PatientController_1.default.saveAppointment);
routes.post('/addvisit', Auth_1.default.authorizationToken, PatientController_1.default.saveVisit);
routes.post('/addvitals', Auth_1.default.authorizationToken, PatientController_1.default.saveVital);
routes.post('/addvisitnote', Auth_1.default.authorizationToken, PatientController_1.default.saveVisitNote);
routes.post('/addmedication', Auth_1.default.authorizationToken, PatientController_1.default.saveMedication);
routes.post('/addphoto', upload.single('photo'), Auth_1.default.authorizationToken, PatientController_1.default.savePhoto);
routes.post('/addProcedure', upload2.single("photo"), Auth_1.default.authorizationToken, PatientController_1.default.saveProcedure);
routes.post('/addchargeitem', Auth_1.default.authorizationToken, PatientController_1.default.savePrChargeItem);
routes.post('/addmedi', Auth_1.default.authorizationToken, PatientController_1.default.savePrMedication);
routes.get('/getpatientbyid/:id', Auth_1.default.authorizationToken, PatientController_1.default.getPatientById);
routes.get('/getpatientvisitdtl/:id/:visitId', Auth_1.default.authorizationToken, PatientController_1.default.getvisitById);
routes.get('/getconsultlist', Auth_1.default.authorizationToken, PatientController_1.default.getAllConsultPatient);
routes.get('/gepatientalldtl/:id/:visitId', Auth_1.default.authorizationToken, PatientController_1.default.getPatientDtlList);
routes.post('/savevisitandmove', Auth_1.default.authorizationToken, PatientController_1.default.saveVisitAndMove);
routes.post('/addscane', upload2.single("photo"), Auth_1.default.authorizationToken, PatientController_1.default.saveScane);
//PatientController End
//PediactrictController
routes.post('/movetopediatrict', Auth_1.default.authorizationToken, PediatricsController_1.default.statusUpdate);
routes.get('/getpedictrictlist', Auth_1.default.authorizationToken, PediatricsController_1.default.getPediactrictList);
routes.post('/addpediactricts', Auth_1.default.authorizationToken, PediatricsController_1.default.save);
routes.get("/getpediactrictbyid/:id", Auth_1.default.authorizationToken, PediatricsController_1.default.getPediactrictById);
routes.post('/savepediactrictandmove', Auth_1.default.authorizationToken, PediatricsController_1.default.savePediactrictAndMove);
//PediactrictController End
//SurgonController 
routes.post('/movetosurgeon', Auth_1.default.authorizationToken, SurgeonController_1.default.statusUpdate);
routes.get('/getsurgeonlist', Auth_1.default.authorizationToken, SurgeonController_1.default.getSurgonList);
routes.post('/addsurgeon', Auth_1.default.authorizationToken, SurgeonController_1.default.save);
routes.get("/getsergeonbyid/:id", Auth_1.default.authorizationToken, SurgeonController_1.default.getSurgeonById);
routes.post('/savesurgonandmove', Auth_1.default.authorizationToken, SurgeonController_1.default.saveSurgonAndMove);
//SurgonController End
//LabController
routes.post('/movetolab', upload1.single('photo'), Auth_1.default.authorizationToken, LabController_1.default.statusUpdate);
routes.get('/getlablist', Auth_1.default.authorizationToken, LabController_1.default.getLabList);
routes.post('/addlab', Auth_1.default.authorizationToken, LabController_1.default.save);
routes.get("/getlabbyid/:id", Auth_1.default.authorizationToken, LabController_1.default.getLabById);
routes.post('/savelabandmove', upload1.single('photo'), Auth_1.default.authorizationToken, LabController_1.default.saveLabAndMove);
//LabController End
//AnesthesiaController 
routes.post('/movetoanesthesia', Auth_1.default.authorizationToken, AnesthesiaController_1.default.statusUpdate);
routes.get('/getanesthesialist', Auth_1.default.authorizationToken, AnesthesiaController_1.default.getAnesthesiaList);
routes.post('/addanesthesia', Auth_1.default.authorizationToken, AnesthesiaController_1.default.save);
routes.get("/getanesthesiabyid/:id", Auth_1.default.authorizationToken, AnesthesiaController_1.default.getAnesthesiaById);
routes.post('/saveanesthesiaandmove', Auth_1.default.authorizationToken, AnesthesiaController_1.default.saveAnesthesiaAndMove);
//AnesthesiaController End
//OperativePlanController
routes.post('/movetoop', Auth_1.default.authorizationToken, OperativePlanController_1.default.statusUpdate);
routes.get("/getopList", Auth_1.default.authorizationToken, OperativePlanController_1.default.getOPList);
routes.post('/addoperativeplan', Auth_1.default.authorizationToken, OperativePlanController_1.default.save);
routes.get("/getopbyid/:id", Auth_1.default.authorizationToken, OperativePlanController_1.default.getOperativePlanById);
//OperativePlanController End
//SurgicalAppointment
routes.post('/movetosa', Auth_1.default.authorizationToken, SurgicalAppointmentController_1.default.statusUpdate);
routes.get('/getsalist', Auth_1.default.authorizationToken, SurgicalAppointmentController_1.default.getSurgicalAppointment);
routes.post('/addsurgicalappointment', Auth_1.default.authorizationToken, SurgicalAppointmentController_1.default.save);
routes.get("/getsabyid/:id", Auth_1.default.authorizationToken, SurgicalAppointmentController_1.default.getSAById);
routes.post('/processcompleted', Auth_1.default.authorizationToken, SurgicalAppointmentController_1.default.processCompleted);
routes.get("/getTheaterSchedule", Auth_1.default.authorizationToken, SurgicalAppointmentController_1.default.getTheaterSchudule);
routes.post('/updatesurgicalappointment', Auth_1.default.authorizationToken, SurgicalAppointmentController_1.default.updateSA);
//SurgicalAppointment End
//RoomAllotment
routes.post('/addroomallotment', Auth_1.default.authorizationToken, RoomAllotmentController_1.default.save);
routes.get("/getallallotment", Auth_1.default.authorizationToken, RoomAllotmentController_1.default.getAllRooms);
routes.get("/getallormentbyid/:id", Auth_1.default.authorizationToken, RoomAllotmentController_1.default.getById);
//RoomAllotment End
//HospitalController
routes.post('/addhospital', Auth_1.default.authorizationToken, HospitalController_1.default.saveHospital);
routes.get("/getallhospital", Auth_1.default.authorizationToken, HospitalController_1.default.getAllHospital);
routes.get("/gethospitalbyid/:id", Auth_1.default.authorizationToken, HospitalController_1.default.getAnesthesiaById);
//# sourceMappingURL=index.js.map