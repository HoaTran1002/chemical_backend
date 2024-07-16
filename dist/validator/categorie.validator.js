"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorieUpdateValidate = exports.checkCategorieId = exports.categorieValidate = void 0;
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
var checkCategorieId = function (data) {
    var product = joi_1.default.object({
        id: joi_1.default.string().trim().required()
    });
    return product.validate(data);
};
exports.checkCategorieId = checkCategorieId;
var categorieUpdateValidate = function (data) {
    var schema = joi_1.default.object({
        id: joi_1.default.string().uuid(),
        name: joi_1.default.string().optional().required(),
        type: joi_1.default.string().valid('FEATURE', 'GROUPH_CHEMICAL')
    });
    return schema.validate(data);
};
exports.categorieUpdateValidate = categorieUpdateValidate;
