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
exports.findById = exports.findByQuery = exports.findAll = void 0;
const vehicleBrand_1 = __importDefault(require("../../../services/vehicleBrand"));
const apiError_1 = require("../../../helpers/apiError");
const findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.json({ status: "success", data: yield vehicleBrand_1.default.findAll() });
    }
    catch (error) {
        return next(new apiError_1.NotFoundError("No records found"));
    }
});
exports.findAll = findAll;
const findByQuery = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.json({ status: "success", data: yield vehicleBrand_1.default.findByQuery(req.query) });
    }
    catch (error) {
        return next(new apiError_1.ValidationError("Invalid query", error));
    }
});
exports.findByQuery = findByQuery;
const findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.json({ status: "success", data: yield vehicleBrand_1.default.findById(req.params.id) });
    }
    catch (error) {
        return next(new apiError_1.ValidationError("Invalid Id", error));
    }
});
exports.findById = findById;
