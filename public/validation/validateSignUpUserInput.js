"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSignUpUserInput = void 0;
var validator_1 = __importDefault(require("validator"));
var is_empty_1 = __importDefault(require("is-empty"));
var validateSignUpUserInput = function (_a) {
    var _b = _a.name, name = _b === void 0 ? "" : _b, _c = _a.email, email = _c === void 0 ? "" : _c, _d = _a.password, password = _d === void 0 ? "" : _d, _e = _a.confirmPassword, confirmPassword = _e === void 0 ? "" : _e;
    var errors = {};
    console.log("Validation");
    if (validator_1.default.isEmpty(name)) {
        errors.name = "Name field is required";
    }
    if (validator_1.default.isEmpty(email)) {
        errors.email = "Email field is required";
    }
    else if (!validator_1.default.isEmail(email)) {
        errors.email = "Email is invalid";
    }
    if (validator_1.default.isEmpty(password)) {
        errors.password = "Password field is required";
    }
    if (validator_1.default.isEmpty(confirmPassword)) {
        errors.confirmPassword = "Confirm password field is required";
    }
    if (!validator_1.default.isLength(password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }
    if (!validator_1.default.equals(password, confirmPassword)) {
        errors.confirmPassword = "Passwords must match";
    }
    return {
        errors: errors,
        isValid: is_empty_1.default(errors),
    };
};
exports.validateSignUpUserInput = validateSignUpUserInput;
