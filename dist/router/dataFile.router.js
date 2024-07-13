"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dataFile_controller_1 = __importDefault(require("../modules/dataFileModule/dataFile.controller"));
var router = (0, express_1.Router)();
router.post('/create', dataFile_controller_1.default.createCategorie);
router.get('/get/:id', dataFile_controller_1.default.getByIdCategorie);
router.get('/getAll', dataFile_controller_1.default.getAllCategorie);
router.patch('/update/:id', dataFile_controller_1.default.updateCategorie);
router.delete('/delete/:id', dataFile_controller_1.default.removeCategorie);
exports.default = router;
