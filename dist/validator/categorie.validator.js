"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorieValidate = void 0;
var joi_1 = __importDefault(require("joi"));
var categorieValidate = function (data) {
    var categorie = joi_1.default.object({
        id: joi_1.default.string(),
        name: joi_1.default.string(),
        type: joi_1.default.string().valid('FEATURE', 'GROUPH_CHEMICAL').required()
    });
    return categorie.validate(data);
};
exports.categorieValidate = categorieValidate;
