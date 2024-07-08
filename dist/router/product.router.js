"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var product_controller_1 = __importDefault(require("../modules/productModule/product.controller"));
var errorHandlingMiddleware_1 = require("../middleware/errorHandlingMiddleware");
var multer_middleware_1 = require("../middleware/multer.middleware");
var validate_middleware_1 = require("../middleware/validate.middleware");
var product_validator_1 = require("../validator/product.validator");
var router = (0, express_1.Router)();
router.post('/create', (0, validate_middleware_1.validator)(product_validator_1.productValidate), multer_middleware_1.uploadMemory.fields([
    { name: 'image', maxCount: 3 },
    { name: 'video', maxCount: 5 }
]), multer_middleware_1.checkFile, (0, errorHandlingMiddleware_1.errAsyncHandlerMiddleware)(product_controller_1.default.createProduct));
router.patch('/update', multer_middleware_1.uploadMemory.fields([
    { name: 'image', maxCount: 3 },
    { name: 'video', maxCount: 5 }
]), multer_middleware_1.checkFile, (0, validate_middleware_1.validator)(product_validator_1.productUpdateValidate), (0, errorHandlingMiddleware_1.errAsyncHandlerMiddleware)(product_controller_1.default.updateProduct));
router.post('/getById', (0, validate_middleware_1.validator)(product_validator_1.checkProductId), (0, errorHandlingMiddleware_1.errAsyncHandlerMiddleware)(product_controller_1.default.getByIdProduct));
router.get('/pagination', (0, validate_middleware_1.validator)(product_validator_1.productPagiNationParams), (0, errorHandlingMiddleware_1.errAsyncHandlerMiddleware)(product_controller_1.default.pagination));
router.delete('/deleteById', (0, validate_middleware_1.validator)(product_validator_1.checkProductId), (0, errorHandlingMiddleware_1.errAsyncHandlerMiddleware)(product_controller_1.default.deleteProductById));
exports.default = router;
