"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var product_router_1 = __importDefault(require("../router/product.router"));
var categorie_router_1 = __importDefault(require("../router/categorie.router"));
var user_router_1 = __importDefault(require("../router/user.router"));
var useRouter = function (app) {
    app.use('/api/v1/product', product_router_1.default);
    app.use('/api/v1/categorie', categorie_router_1.default);
    app.use('/api/v1/user', user_router_1.default);
};
exports.default = useRouter;
