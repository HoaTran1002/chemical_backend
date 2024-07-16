"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var ApiError_1 = __importDefault(require("../utils/ApiError"));
var env_1 = __importDefault(require("../env"));
var authMiddleware = function (req, res, next) {
    var _a;
    var token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        throw new ApiError_1.default(401, 'No access token provided');
    }
    jsonwebtoken_1.default.verify(token, env_1.default.SECRET_KEY_ACCESS_TOKEN, function (err, decoded) {
        if (err) {
            throw new ApiError_1.default(401, 'Invalid token');
        }
        next();
    });
};
exports.default = authMiddleware;
