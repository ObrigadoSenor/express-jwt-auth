"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenExpired = exports.createToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var createToken = function (_a) {
    var _id = _a._id, name = _a.name;
    return jsonwebtoken_1.default.sign({
        _id: _id,
        name: name,
    }, 'secret', {
        expiresIn: 31556926,
    });
};
exports.createToken = createToken;
var getVerifiedToken = function (_a) {
    var token = _a.token;
    return jsonwebtoken_1.default.verify(token, 'secret');
};
var isTokenExpired = function (_a) {
    var token = _a.token;
    if (!token)
        return true;
    var exp = getVerifiedToken({ token: token }).exp;
    if (!exp)
        return true;
    var millisecondExp = exp * 1000;
    return Date.now() > millisecondExp;
};
exports.isTokenExpired = isTokenExpired;
