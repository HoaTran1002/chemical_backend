"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var env_1 = __importDefault(require("../env"));
var JWTService = /** @class */ (function () {
    function JWTService() {
        this.accessTokenSecret = env_1.default.SECRET_KEY_ACCESS_TOKEN;
        this.refreshTokenSecret = env_1.default.REFRESH_TOKEN_SECRET;
    }
    JWTService.prototype.generateAccessToken = function (payload) {
        return jsonwebtoken_1.default.sign(payload, this.accessTokenSecret, { expiresIn: '15d' });
    };
    JWTService.prototype.generateRefreshToken = function (payload) {
        return jsonwebtoken_1.default.sign(payload, this.refreshTokenSecret, { expiresIn: '360d' });
    };
    JWTService.prototype.decodeAccessToken = function (token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.accessTokenSecret);
        }
        catch (e) {
            return null;
        }
    };
    JWTService.prototype.decodeRefreshToken = function (token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.refreshTokenSecret);
        }
        catch (e) {
            return null;
        }
    };
    return JWTService;
}());
exports.default = new JWTService();
