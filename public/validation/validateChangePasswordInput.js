"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateChangePasswordInput = void 0;
var validator_1 = __importDefault(require("validator"));
var is_empty_1 = __importDefault(require("is-empty"));
var validateChangePasswordInput = function (_a) {
    var _b = _a.oldPassword, oldPassword = _b === void 0 ? "" : _b, _c = _a.newPassword, newPassword = _c === void 0 ? "" : _c, _d = _a.newConfirmPassword, newConfirmPassword = _d === void 0 ? "" : _d, _e = _a._id, _id = _e === void 0 ? "" : _e;
    var errors = {};
    if (validator_1.default.isEmpty(oldPassword)) {
        errors.oldPassword = "Existing password field is required";
    }
    if (validator_1.default.isEmpty(newPassword)) {
        errors.newPassword = "New password field is required";
    }
    if (!validator_1.default.isLength(oldPassword, { min: 6, max: 30 })) {
        errors.oldPassword = "Old password must be at least 6 characters";
    }
    if (!validator_1.default.isLength(newPassword, { min: 6, max: 30 })) {
        errors.newPassword = "Updated password must be at least 6 characters";
    }
    if (!validator_1.default.isLength(newConfirmPassword, { min: 6, max: 30 })) {
        errors.newConfirmPassword =
            "Updated confirm password must be at least 6 characters";
    }
    else if (!validator_1.default.equals(newPassword, newConfirmPassword)) {
        errors.newConfirmPassword = "Updated passwords must match";
    }
    if (validator_1.default.isEmpty(_id)) {
        errors._id = "No user exists to rename.";
    }
    return {
        errors: errors,
        isValid: is_empty_1.default(errors),
    };
};
exports.validateChangePasswordInput = validateChangePasswordInput;
