"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    // jwt
    SECRET_KEY_ACCESS_TOKEN: process.env.SECRET_KEY_ACCESS_TOKEN,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET
};
