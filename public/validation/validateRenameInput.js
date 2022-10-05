"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRenameInput = void 0;
var validator_1 = __importDefault(require("validator"));
var is_empty_1 = __importDefault(require("is-empty"));
var validateRenameInput = function (_a) {
    var _b = _a.name, name = _b === void 0 ? "" : _b, _c = _a._id, _id = _c === void 0 ? "" : _c;
    var errors = {};
    if (validator_1.default.isEmpty(name)) {
        errors.name = "Name field is required.";
    }
    // Password checks
    if (validator_1.default.isEmpty(_id)) {
        errors._id = "No user exists to rename.";
    }
    return {
        errors: errors,
        isValid: is_empty_1.default(errors),
    };
};
exports.validateRenameInput = validateRenameInput;
