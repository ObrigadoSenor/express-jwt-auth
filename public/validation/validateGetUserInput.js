"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGetUserInput = void 0;
var validator_1 = __importDefault(require("validator"));
var is_empty_1 = __importDefault(require("is-empty"));
var validateGetUserInput = function (_a) {
    var _b = _a.email, email = _b === void 0 ? "" : _b, _c = _a.name, name = _c === void 0 ? "" : _c;
    var errors = {};
    if (validator_1.default.isEmpty(email) && validator_1.default.isEmpty(name)) {
        errors.email = "Email or name must is required.";
        errors.name = "Email or name must is required.";
    }
    else if (!validator_1.default.isEmail(email) && validator_1.default.isEmpty(name)) {
        errors.email = "Email is invalid.";
    }
    return {
        errors: errors,
        isValid: is_empty_1.default(errors),
    };
};
exports.validateGetUserInput = validateGetUserInput;
