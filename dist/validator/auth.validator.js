"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserId = exports.refreshTokenValidate = exports.loginValidate = exports.updateValidate = exports.registerValidate = void 0;
var joi_1 = __importDefault(require("joi"));
var registerValidate = function (data) {
    var schema = joi_1.default.object({
        userName: joi_1.default.string().required(),
        passWord: joi_1.default.string().required(),
        idRole: joi_1.default.string()
    });
    return schema.validate(data);
};
exports.registerValidate = registerValidate;
var updateValidate = function (data) {
    var schema = joi_1.default.object({
        id: joi_1.default.string().trim().required(),
        userName: joi_1.default.string(),
        passWord: joi_1.default.string(),
        idRole: joi_1.default.string()
    });
    return schema.validate(data);
};
exports.updateValidate = updateValidate;
var loginValidate = function (data) {
    var schema = joi_1.default.object({
        userName: joi_1.default.string().required(),
        passWord: joi_1.default.string().required()
    });
    return schema.validate(data);
};
exports.loginValidate = loginValidate;
var refreshTokenValidate = function (data) {
    var schema = joi_1.default.object({
        refreshToken: joi_1.default.string().required()
    });
    return schema.validate(data);
};
exports.refreshTokenValidate = refreshTokenValidate;
var checkUserId = function (data) {
    var product = joi_1.default.object({
        id: joi_1.default.string().trim().required()
    });
    return product.validate(data);
};
exports.checkUserId = checkUserId;
