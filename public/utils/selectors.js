"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUser = exports.findUserByName = exports.findUserByEmail = exports.findUserById = void 0;
var user_1 = require("./../models/user");
var findUserById = function (_a) {
    var _id = _a._id;
    return user_1.User.findOne({ _id: _id }).then(function (existingUser) { return existingUser; });
};
exports.findUserById = findUserById;
var findUserByEmail = function (_a) {
    var email = _a.email;
    return user_1.User.findOne({ email: email }).then(function (existingUser) { return existingUser; });
};
exports.findUserByEmail = findUserByEmail;
var findUserByName = function (_a) {
    var name = _a.name;
    return user_1.User.findOne({ name: name }).then(function (existingUser) { return existingUser; });
};
exports.findUserByName = findUserByName;
var findUser = function (args) {
    return user_1.User.findOne(__assign({}, args)).then(function (existingUser) { return existingUser; });
};
exports.findUser = findUser;
