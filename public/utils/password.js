"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validPassword = exports.hashPassword = exports.saltPassword = void 0;
var crypto_1 = require("crypto");
var saltPassword = function () { return crypto_1.randomBytes(16).toString("hex"); };
exports.saltPassword = saltPassword;
var hashPassword = function (_a) {
    var password = _a.password, salt = _a.salt;
    return crypto_1.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
};
exports.hashPassword = hashPassword;
var validPassword = function (_a) {
    var password = _a.password, hash = _a.hash, salt = _a.salt;
    return exports.hashPassword({ password: password, salt: salt }) === hash;
};
exports.validPassword = validPassword;
