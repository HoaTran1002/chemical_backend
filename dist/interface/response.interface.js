"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IResponseErrorObject = void 0;
var IResponseErrorObject = /** @class */ (function () {
    function IResponseErrorObject(message, statusCode) {
        if (statusCode === void 0) { statusCode = 400; }
        this.statusCode = statusCode;
        this.message = message;
    }
    return IResponseErrorObject;
}());
exports.IResponseErrorObject = IResponseErrorObject;
