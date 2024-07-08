"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var firebaseStorage_service_1 = require("../firebase/firebaseStorage.service");
var ApiError_1 = __importDefault(require("../../utils/ApiError"));
var ProductServices = /** @class */ (function () {
    function ProductServices() {
        this.prisma = new client_1.PrismaClient();
    }
    ProductServices.prototype.create = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var record;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.product.create({ data: payload })];
                    case 1:
                        record = _a.sent();
                        return [2 /*return*/, record];
                }
            });
        });
    };
    ProductServices.prototype.productAndFileInitializationProcess = function (prams) {
        return __awaiter(this, void 0, void 0, function () {
            var fileUploaded, result, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileUploaded = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.prisma.$transaction(function () { return __awaiter(_this, void 0, void 0, function () {
                                var i, imageUpload, file, i, videoUpload, file, record, record;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!prams.files) return [3 /*break*/, 8];
                                            if (!prams.files.image) return [3 /*break*/, 4];
                                            i = 0;
                                            _a.label = 1;
                                        case 1:
                                            if (!(i < prams.files.image.length)) return [3 /*break*/, 4];
                                            return [4 /*yield*/, (0, firebaseStorage_service_1.uploadFileService)({
                                                    name: prams.files.image[i].originalname,
                                                    mimetype: prams.files.image[i].mimetype,
                                                    file: prams.files.image[i]
                                                })];
                                        case 2:
                                            imageUpload = _a.sent();
                                            file = {
                                                name: imageUpload.name,
                                                link: imageUpload.url,
                                                type: prams.files.image[i].mimetype.toString()
                                            };
                                            fileUploaded.push(file);
                                            console.log('image link:', imageUpload.url);
                                            _a.label = 3;
                                        case 3:
                                            i++;
                                            return [3 /*break*/, 1];
                                        case 4:
                                            if (!prams.files.video) return [3 /*break*/, 8];
                                            i = 0;
                                            _a.label = 5;
                                        case 5:
                                            if (!(i < prams.files.video.length)) return [3 /*break*/, 8];
                                            return [4 /*yield*/, (0, firebaseStorage_service_1.uploadFileService)({
                                                    name: prams.files.video[i].originalname,
                                                    mimetype: prams.files.video[i].mimetype,
                                                    file: prams.files.video[i]
                                                })];
                                        case 6:
                                            videoUpload = _a.sent();
                                            file = {
                                                name: videoUpload.name,
                                                link: videoUpload.url,
                                                type: prams.files.video[i].mimetype.toString()
                                            };
                                            fileUploaded.push(file);
                                            console.log('video link:', videoUpload.url);
                                            console.log('video type:', prams.files.video[i].mimetype.toString());
                                            _a.label = 7;
                                        case 7:
                                            i++;
                                            return [3 /*break*/, 5];
                                        case 8:
                                            if (!(fileUploaded.length > 0)) return [3 /*break*/, 10];
                                            return [4 /*yield*/, this.prisma.product.create({
                                                    data: __assign(__assign({}, prams.payload), { datafiles: { create: fileUploaded } })
                                                })];
                                        case 9:
                                            record = _a.sent();
                                            return [2 /*return*/, record];
                                        case 10: return [4 /*yield*/, this.prisma.product.create({ data: prams.payload })];
                                        case 11:
                                            record = _a.sent();
                                            return [2 /*return*/, record];
                                    }
                                });
                            }); }, {
                                timeout: 60000 * 3
                            })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        error_1 = _a.sent();
                        if (fileUploaded.length > 0) {
                            (0, firebaseStorage_service_1.deleteFileService)(fileUploaded);
                        }
                        throw new ApiError_1.default(400, error_1.message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductServices.prototype.productUpdateById = function (prams) {
        return __awaiter(this, void 0, void 0, function () {
            var fileUploaded, result, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileUploaded = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.prisma.$transaction(function () { return __awaiter(_this, void 0, void 0, function () {
                                var i, imageUpload, file, i, videoUpload, file, record, record;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!prams.files) return [3 /*break*/, 8];
                                            if (!prams.files.image) return [3 /*break*/, 4];
                                            i = 0;
                                            _a.label = 1;
                                        case 1:
                                            if (!(i < prams.files.image.length)) return [3 /*break*/, 4];
                                            return [4 /*yield*/, (0, firebaseStorage_service_1.uploadFileService)({
                                                    name: prams.files.image[i].originalname,
                                                    mimetype: prams.files.image[i].mimetype,
                                                    file: prams.files.image[i]
                                                })];
                                        case 2:
                                            imageUpload = _a.sent();
                                            file = {
                                                name: imageUpload.name,
                                                link: imageUpload.url,
                                                type: prams.files.image[i].mimetype.toString()
                                            };
                                            fileUploaded.push(file);
                                            console.log('image link:', imageUpload.url);
                                            _a.label = 3;
                                        case 3:
                                            i++;
                                            return [3 /*break*/, 1];
                                        case 4:
                                            if (!prams.files.video) return [3 /*break*/, 8];
                                            i = 0;
                                            _a.label = 5;
                                        case 5:
                                            if (!(i < prams.files.video.length)) return [3 /*break*/, 8];
                                            return [4 /*yield*/, (0, firebaseStorage_service_1.uploadFileService)({
                                                    name: prams.files.video[i].originalname,
                                                    mimetype: prams.files.video[i].mimetype,
                                                    file: prams.files.video[i]
                                                })];
                                        case 6:
                                            videoUpload = _a.sent();
                                            file = {
                                                name: videoUpload.name,
                                                link: videoUpload.url,
                                                type: prams.files.image[i].mimetype.toString()
                                            };
                                            fileUploaded.push(file);
                                            console.log('image link:', videoUpload.url);
                                            _a.label = 7;
                                        case 7:
                                            i++;
                                            return [3 /*break*/, 5];
                                        case 8:
                                            if (!(fileUploaded.length > 0)) return [3 /*break*/, 10];
                                            return [4 /*yield*/, this.prisma.product.update({
                                                    where: { id: prams.payload.id },
                                                    data: __assign(__assign({}, prams.payload), { datafiles: { create: fileUploaded } })
                                                })];
                                        case 9:
                                            record = _a.sent();
                                            return [2 /*return*/, record];
                                        case 10: return [4 /*yield*/, this.prisma.product.update({ where: { id: prams.payload.id }, data: prams.payload })];
                                        case 11:
                                            record = _a.sent();
                                            return [2 /*return*/, record];
                                    }
                                });
                            }); }, {
                                timeout: 60000 * 3
                            })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        error_2 = _a.sent();
                        if (fileUploaded.length > 0) {
                            (0, firebaseStorage_service_1.deleteFileService)(fileUploaded);
                        }
                        throw new ApiError_1.default(400, error_2.message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductServices.prototype.productDataAccessProcess = function (prams) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.prisma.$transaction(function () { return __awaiter(_this, void 0, void 0, function () {
                                var productRecord, images, videos;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.prisma.product.findUnique({
                                                where: { id: prams.id }
                                            })];
                                        case 1:
                                            productRecord = (_a.sent());
                                            return [4 /*yield*/, this.prisma.dataFile.findMany({
                                                    where: { productId: prams.id, type: { startsWith: 'image/' } }
                                                })];
                                        case 2:
                                            images = (_a.sent());
                                            return [4 /*yield*/, this.prisma.dataFile.findMany({
                                                    where: { productId: prams.id, type: { startsWith: 'video/' } }
                                                })];
                                        case 3:
                                            videos = (_a.sent());
                                            return [2 /*return*/, __assign(__assign({}, productRecord), { images: images, videos: videos })];
                                    }
                                });
                            }); })];
                    case 1: return [2 /*return*/, (_a.sent())];
                    case 2:
                        error_3 = _a.sent();
                        throw new ApiError_1.default(400, error_3.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductServices.prototype.pagination = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (params.currentPage <= 0) {
                            return [2 /*return*/, {
                                    productsPageCurrent: [],
                                    nextPage: null,
                                    prePage: null,
                                    totalPage: 0
                                }];
                        }
                        return [4 /*yield*/, this.prisma.$transaction(function () { return __awaiter(_this, void 0, void 0, function () {
                                var productTotal, totalPage, skipRecord, products, nextPage, prePage, productsPageCurrent;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.prisma.product.count()];
                                        case 1:
                                            productTotal = _a.sent();
                                            totalPage = Math.ceil(productTotal / params.pageSize);
                                            skipRecord = (params.currentPage - 1) * params.pageSize;
                                            if (params.currentPage > totalPage) {
                                                return [2 /*return*/, {
                                                        productsPageCurrent: [],
                                                        nextPage: null,
                                                        prePage: null,
                                                        totalPage: totalPage
                                                    }];
                                            }
                                            return [4 /*yield*/, this.prisma.product.findMany({
                                                    skip: skipRecord,
                                                    take: params.pageSize,
                                                    orderBy: { id: 'asc' }
                                                })];
                                        case 2:
                                            products = _a.sent();
                                            nextPage = params.currentPage + 1 <= totalPage ? params.currentPage + 1 : null;
                                            prePage = params.currentPage - 1 > 0 ? params.currentPage - 1 : null;
                                            return [4 /*yield*/, Promise.all(products.map(function (product) { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, this.productDataAccessProcess({ id: product.id })];
                                                            case 1: return [2 /*return*/, _a.sent()];
                                                        }
                                                    });
                                                }); }))];
                                        case 3:
                                            productsPageCurrent = _a.sent();
                                            return [2 /*return*/, {
                                                    productsPageCurrent: productsPageCurrent,
                                                    nextPage: nextPage,
                                                    prePage: prePage,
                                                    totalPage: totalPage
                                                }];
                                    }
                                });
                            }); })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ProductServices.prototype.productDeleteByIdProcess = function (prams) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    result = this.prisma.$transaction(function () { return __awaiter(_this, void 0, void 0, function () {
                        var dataFiles, deletePromises;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.prisma.dataFile.findMany({
                                        where: { productId: prams.id }
                                    })];
                                case 1:
                                    dataFiles = (_a.sent());
                                    if (!(Array.isArray(dataFiles) && dataFiles.length > 0)) return [3 /*break*/, 4];
                                    return [4 /*yield*/, (0, firebaseStorage_service_1.deleteFileService)(dataFiles)];
                                case 2:
                                    _a.sent();
                                    deletePromises = dataFiles.map(function (item) { return _this.prisma.dataFile.delete({ where: { id: item.id } }); });
                                    return [4 /*yield*/, Promise.all(deletePromises)];
                                case 3:
                                    _a.sent();
                                    _a.label = 4;
                                case 4:
                                    console.log('Product and related DataFiles deleted successfully.');
                                    return [4 /*yield*/, this.prisma.product.delete({ where: { id: prams.id } })];
                                case 5: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); });
                    return [2 /*return*/, result];
                }
                catch (error) {
                    throw new ApiError_1.default(400, error.message);
                }
                return [2 /*return*/];
            });
        });
    };
    return ProductServices;
}());
exports.default = new ProductServices();
