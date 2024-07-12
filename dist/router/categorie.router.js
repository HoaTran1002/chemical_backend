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
var router = (0, express_1.Router)();
router.post('/create', (0, validate_middleware_1.validator)(categorie_validator_1.categorieValidate), (0, errorHandlingMiddleware_1.errAsyncHandlerMiddleware)(categorie_controller_1.default.createCategorie));
router.get('/get/:id', categorie_controller_1.default.getByIdCategorie);
router.get('/getAll', categorie_controller_1.default.getAllCategorie);
router.patch('/update/:id', categorie_controller_1.default.updateCategorie);
router.delete('/delete/:id', categorie_controller_1.default.removeCategorie);
exports.default = router;
