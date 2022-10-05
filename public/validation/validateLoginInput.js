"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginInput = void 0;
var validator_1 = __importDefault(require("validator"));
var is_empty_1 = __importDefault(require("is-empty"));
var validateLoginInput = function (_a) {
    var _b = _a.email, email = _b === void 0 ? "" : _b, _c = _a.password, password = _c === void 0 ? "" : _c, _d = _a._id, _id = _d === void 0 ? "" : _d;
    var errors = {};
    if (validator_1.default.isEmpty(email)) {
        errors.email = "Email field is required";
    }
    else if (!validator_1.default.isEmail(email)) {
        errors.email = "Email is invalid";
    }
    // Password checks
    if (validator_1.default.isEmpty(password)) {
        errors.password = "Password field is required";
    }
    return {
        errors: errors,
        isValid: is_empty_1.default(errors),
    };
};
exports.validateLoginInput = validateLoginInput;
