"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.signAccessToken = {
    signAccessToken: (email) => {
        return new Promise((resolve, reject) => {
            var _a;
            const payload = {};
            const secret = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.ACCESS_TOKEN_SECRECT;
            const options = {
                expiresIn: "1h",
                issuer: "test.com.site",
                audience: email,
            };
            jsonwebtoken_1.default.sign(payload, secret, options, (error, token) => {
                if (error) {
                    reject(error);
                }
                resolve(token);
            });
        });
    },
    verifyAccessToken: (request, response, next) => {
        if (!request.headers['authorization'])
            return next('TokenError');
        const headers = request.headers['authorization'];
        const headersArray = headers.split(' ');
        const token = headersArray[1];
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRECT, (error, payload) => {
            if (error) {
                if (error.name === 'JsonWebTokenError')
                    return next('TokenError');
                return next("tokenError");
            }
            request.payload = payload;
            next();
        });
    },
};
