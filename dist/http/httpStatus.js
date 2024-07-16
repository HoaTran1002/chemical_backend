"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    // 2xx Success
    OK: {
        code: 200,
        message: 'OK'
    },
    CREATED: {
        code: 201,
        message: 'Created'
    },
    ACCEPTED: {
        code: 202,
        message: 'Accepted'
    },
    NON_AUTHORITATIVE_INFORMATION: {
        code: 203,
        message: 'Non-Authoritative Information'
    },
    NO_CONTENT: {
        code: 204,
        message: 'No Content'
    },
    RESET_CONTENT: {
        code: 205,
        message: 'Reset Content'
    },
    PARTIAL_CONTENT: {
        code: 206,
        message: 'Partial Content'
    },
    // 4xx Client Errors
    BAD_REQUEST: {
        code: 400,
        message: 'Bad Request'
    },
    UNAUTHORIZED: {
        code: 401,
        message: 'Unauthorized'
    },
    PAYMENT_REQUIRED: {
        code: 402,
        message: 'Payment Required'
    },
    FORBIDDEN: {
        code: 403,
        message: 'Forbidden'
    },
    NOT_FOUND: {
        code: 404,
        message: 'Not Found'
    },
    REQUEST_TIMEOUT: {
        code: 408,
        message: 'Request Timeout'
    },
    // 5xx Server Errors
    INTERNAL_SERVER_ERROR: {
        code: 500,
        message: 'Internal Server Error'
    },
    BAD_GATEWAY: {
        code: 502,
        message: 'Bad Gateway'
    },
    GATEWAY_TIMEOUT: {
        code: 504,
        message: 'Gateway Timeout'
    }
};
