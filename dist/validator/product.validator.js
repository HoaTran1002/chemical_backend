"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productPagiNationParams = exports.checkProductId = exports.productUpdateValidate = exports.productValidate = void 0;
var joi_1 = __importDefault(require("joi"));
var productValidate = function (data) {
    var product = joi_1.default.object({
        id: joi_1.default.string(),
        name: joi_1.default.string(),
        title: joi_1.default.string(),
        description: joi_1.default.string(),
        blog: joi_1.default.string()
    });
    return product.validate(data);
};
exports.productValidate = productValidate;
var productUpdateValidate = function (data) {
    var product = joi_1.default.object({
        id: joi_1.default.string().trim().required(),
        name: joi_1.default.string(),
        title: joi_1.default.string(),
        description: joi_1.default.string(),
        blog: joi_1.default.string()
    });
    return product.validate(data);
};
exports.productUpdateValidate = productUpdateValidate;
var checkProductId = function (data) {
    var product = joi_1.default.object({
        id: joi_1.default.string().trim().required()
    });
    return product.validate(data);
};
exports.checkProductId = checkProductId;
var productPagiNationParams = function (data) {
    var product = joi_1.default.object({
        pageSize: joi_1.default.number().required(),
        currentPage: joi_1.default.number().required()
    });
    return product.validate(data);
};
exports.productPagiNationParams = productPagiNationParams;
