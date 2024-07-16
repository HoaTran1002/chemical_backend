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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_service_1 = __importDefault(require("../../modules/userModule/user.service"));
var jwt_service_1 = __importDefault(require("../../jwt/jwt.service"));
var ApiError_1 = __importDefault(require("../../utils/ApiError"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.register = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, accessToken, refreshToken, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, user_service_1.default.handleRegister(req.body)];
                    case 1:
                        user = _a.sent();
                        accessToken = jwt_service_1.default.generateAccessToken({ id: user.id, role: user.idRole });
                        refreshToken = jwt_service_1.default.generateRefreshToken({ id: user.id, role: user.idRole });
                        return [4 /*yield*/, user_service_1.default.saveRefreshToken(user.id, refreshToken)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(201).json({ user: user, accessToken: accessToken, refreshToken: refreshToken })];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, res.status(error_1.statusCode || 500).json({ message: error_1.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.logIn = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userName, passWord, user, _b, accessToken, refreshToken, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        _a = req.body, userName = _a.userName, passWord = _a.passWord;
                        return [4 /*yield*/, user_service_1.default.findUserByName(userName)];
                    case 1:
                        user = _c.sent();
                        _b = !user;
                        if (_b) return [3 /*break*/, 3];
                        return [4 /*yield*/, bcrypt_1.default.compare(passWord, user.passWord)];
                    case 2:
                        _b = !(_c.sent());
                        _c.label = 3;
                    case 3:
                        if (_b) {
                            throw new ApiError_1.default(401, 'Invalid username or password');
                        }
                        accessToken = jwt_service_1.default.generateAccessToken({ id: user.id, role: user.idRole });
                        refreshToken = jwt_service_1.default.generateRefreshToken({ id: user.id, role: user.idRole });
                        return [4 /*yield*/, user_service_1.default.saveRefreshToken(user.id, refreshToken)];
                    case 4:
                        _c.sent();
                        return [2 /*return*/, res.status(200).json({ user: user, accessToken: accessToken, refreshToken: refreshToken })];
                    case 5:
                        error_2 = _c.sent();
                        return [2 /*return*/, res.status(error_2.statusCode || 500).json({ message: error_2.message })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.logout = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        refreshToken = req.body.refreshToken;
                        return [4 /*yield*/, user_service_1.default.deleteRefreshToken(refreshToken)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json({ message: 'Logged out successfully' })];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, res.status(error_3.statusCode || 500).json({ message: error_3.message })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.refreshToken = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken, decoded, _a, user, newAccessToken, newRefreshToken, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        refreshToken = req.body.refreshToken;
                        decoded = jwt_service_1.default.decodeRefreshToken(refreshToken);
                        _a = !decoded;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, user_service_1.default.findRefreshToken(refreshToken)];
                    case 1:
                        _a = !(_b.sent());
                        _b.label = 2;
                    case 2:
                        if (_a) {
                            throw new ApiError_1.default(401, 'Invalid refresh token');
                        }
                        return [4 /*yield*/, user_service_1.default.findUserById(decoded.id)];
                    case 3:
                        user = _b.sent();
                        if (!user) {
                            throw new ApiError_1.default(404, 'User not found');
                        }
                        newAccessToken = jwt_service_1.default.generateAccessToken({ id: user.id, role: user.idRole });
                        newRefreshToken = jwt_service_1.default.generateRefreshToken({ id: user.id, role: user.idRole });
                        return [4 /*yield*/, user_service_1.default.saveRefreshToken(user.id, newRefreshToken)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken })];
                    case 5:
                        error_4 = _b.sent();
                        return [2 /*return*/, res.status(error_4.statusCode || 500).json({ message: error_4.message })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.createUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_service_1.default.createUser(req.body)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, res.status(201).json(user)];
                    case 2:
                        error_5 = _a.sent();
                        return [2 /*return*/, res.status(error_5.statusCode || 500).json({ message: error_5.message })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.updateUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, updatedUser, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.body.id;
                        return [4 /*yield*/, user_service_1.default.updateUser(id, req.body)];
                    case 1:
                        updatedUser = _a.sent();
                        return [2 /*return*/, res.status(200).json(updatedUser)];
                    case 2:
                        error_6 = _a.sent();
                        return [2 /*return*/, res.status(error_6.statusCode || 500).json({ message: error_6.message })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.deleteUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.body.id;
                        return [4 /*yield*/, user_service_1.default.deleteUser(id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json({ message: 'User deleted successfully' })];
                    case 2:
                        error_7 = _a.sent();
                        return [2 /*return*/, res.status(error_7.statusCode || 500).json({ message: error_7.message })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getAllUsers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_service_1.default.getAllUsers()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, res.status(200).json(users)];
                    case 2:
                        error_8 = _a.sent();
                        return [2 /*return*/, res.status(error_8.statusCode || 500).json({ message: error_8.message })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getUserById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.body.id;
                        return [4 /*yield*/, user_service_1.default.findUserById(id)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new ApiError_1.default(404, 'User not found');
                        }
                        return [2 /*return*/, res.status(200).json(user)];
                    case 2:
                        error_9 = _a.sent();
                        return [2 /*return*/, res.status(error_9.statusCode || 500).json({ message: error_9.message })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.default = new UserController();
