"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var categorie_controller_1 = __importDefault(require("../modules/categorieModule/categorie.controller"));
var errorHandlingMiddleware_1 = require("../middleware/errorHandlingMiddleware");
var validate_middleware_1 = require("../middleware/validate.middleware");
var categorie_validator_1 = require("../validator/categorie.validator");
var role_middleware_1 = __importDefault(require("../middleware/role.middleware"));
var auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
var router = (0, express_1.Router)();
router.post('/create', (0, validate_middleware_1.validator)(categorie_validator_1.categorieValidate), auth_middleware_1.default, (0, role_middleware_1.default)(['admin']), (0, errorHandlingMiddleware_1.errAsyncHandlerMiddleware)(categorie_controller_1.default.createCategory));
router.get('/get', (0, validate_middleware_1.validator)(categorie_validator_1.checkCategorieId), auth_middleware_1.default, (0, role_middleware_1.default)(['admin']), (0, errorHandlingMiddleware_1.errAsyncHandlerMiddleware)(categorie_controller_1.default.getCategoryById));
router.get('/getAll', auth_middleware_1.default, (0, role_middleware_1.default)(['admin']), (0, errorHandlingMiddleware_1.errAsyncHandlerMiddleware)(categorie_controller_1.default.getAllCategories));
router.patch('/update', (0, validate_middleware_1.validator)(categorie_validator_1.categorieUpdateValidate), (0, validate_middleware_1.validator)(categorie_validator_1.checkCategorieId), auth_middleware_1.default, (0, role_middleware_1.default)(['admin']), (0, errorHandlingMiddleware_1.errAsyncHandlerMiddleware)(categorie_controller_1.default.updateCategory));
router.delete('/delete', (0, validate_middleware_1.validator)(categorie_validator_1.checkCategorieId), auth_middleware_1.default, (0, role_middleware_1.default)(['admin']), (0, errorHandlingMiddleware_1.errAsyncHandlerMiddleware)(categorie_controller_1.default.deleteCategory));
exports.default = router;
