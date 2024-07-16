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
var client_1 = require("@prisma/client");
var ApiError_1 = __importDefault(require("../../utils/ApiError"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var UserServices = /** @class */ (function () {
    function UserServices() {
        this.prisma = new client_1.PrismaClient();
    }
    UserServices.prototype.createUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var role, hashedPassword, data, record;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('user role id', user.idRole);
                        if (!user.idRole) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.prisma.role.findUnique({
                                where: { id: user.idRole }
                            })];
                    case 1:
                        role = _a.sent();
                        console.log('admin');
                        return [3 /*break*/, 6];
                    case 2:
                        if (!!role) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.prisma.role.findFirst({
                                where: { roleName: 'nv' }
                            })];
                    case 3:
                        role = _a.sent();
                        if (!!role) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.prisma.role.create({
                                data: { roleName: 'nv' }
                            })];
                    case 4:
                        role = _a.sent();
                        _a.label = 5;
                    case 5:
                        console.log('nv');
                        _a.label = 6;
                    case 6: return [4 /*yield*/, bcrypt_1.default.hash(user.passWord, 10)];
                    case 7:
                        hashedPassword = _a.sent();
                        data = {
                            userName: user.userName,
                            passWord: hashedPassword,
                            idRole: role ? role.id : ''
                        };
                        console.log('data create user:', data);
                        return [4 /*yield*/, this.prisma.user.create({
                                data: data
                            })];
                    case 8:
                        record = _a.sent();
                        return [2 /*return*/, record];
                }
            });
        });
    };
    UserServices.prototype.findUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.user.findUnique({
                            where: { id: id }
                        })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserServices.prototype.findUserByName = function (userName) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.user.findUnique({
                            where: { userName: userName }
                        })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserServices.prototype.handleRegister = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var userExist, record;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findUserByName(user.userName)];
                    case 1:
                        userExist = _a.sent();
                        if (userExist) {
                            throw new ApiError_1.default(409, 'User exists');
                        }
                        return [4 /*yield*/, this.createUser(user)];
                    case 2:
                        record = _a.sent();
                        return [2 /*return*/, record];
                }
            });
        });
    };
    UserServices.prototype.saveRefreshToken = function (userId, token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.refreshToken.create({
                            data: {
                                userId: userId,
                                token: token
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserServices.prototype.deleteRefreshToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.refreshToken.deleteMany({
                            where: { token: token }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserServices.prototype.findRefreshToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.refreshToken.findFirst({
                            where: { token: token }
                        })];
                    case 1:
                        refreshToken = _a.sent();
                        return [2 /*return*/, !!refreshToken];
                }
            });
        });
    };
    UserServices.prototype.updateUser = function (id, userData) {
        return __awaiter(this, void 0, void 0, function () {
            var hashedPassword, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!userData.passWord) return [3 /*break*/, 2];
                        return [4 /*yield*/, bcrypt_1.default.hash(userData.passWord, 10)];
                    case 1:
                        hashedPassword = _a.sent();
                        userData.passWord = hashedPassword;
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.prisma.user.update({
                            where: { id: id },
                            data: userData
                        })];
                    case 3:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserServices.prototype.deleteUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.prisma.$transaction(function (prisma) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, prisma.refreshToken.deleteMany({
                                                where: { userId: id }
                                            })];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, prisma.user.delete({
                                                    where: { id: id }
                                                })];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        console.log("User with id ".concat(id, " has been deleted successfully."));
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error deleting user:', error_1);
                        throw new ApiError_1.default(500, error_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserServices.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.user.findMany()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                }
            });
        });
    };
    return UserServices;
}());
exports.default = new UserServices();
