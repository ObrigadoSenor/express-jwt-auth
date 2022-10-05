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
var signUpUserResolver_1 = require("./signUpUserResolver");
var loginUserResolver_1 = require("./loginUserResolver");
var deleteUserResolver_1 = require("./deleteUserResolver");
var renameUserResolver_1 = require("./renameUserResolver");
var changePasswordUserResolver_1 = require("./changePasswordUserResolver");
var getUserResolver_1 = require("./getUserResolver");
exports.default = {
    Query: __assign({}, getUserResolver_1.getUserResolver),
    Mutation: __assign(__assign(__assign(__assign(__assign({}, signUpUserResolver_1.signUpUserResolver), loginUserResolver_1.loginUserResolver), deleteUserResolver_1.deleteUserResolver), renameUserResolver_1.renameUserResolver), changePasswordUserResolver_1.changePasswordUserResolver),
};
