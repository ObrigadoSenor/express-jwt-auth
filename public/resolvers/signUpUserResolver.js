"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpUserResolver = void 0;
var user_1 = require("../models/user");
var password_1 = require("../utils/password");
var selectors_1 = require("../utils/selectors");
var validateSignUpUserInput_1 = require("../validation/validateSignUpUserInput");
var token_1 = require("../utils/token");
exports.signUpUserResolver = {
    signUpUser: function (_, args) {
        var _this = this;
        var _a = validateSignUpUserInput_1.validateSignUpUserInput(args), errors = _a.errors, isValid = _a.isValid;
        if (!isValid) {
            return { status: { code: 400 }, node: { errors: errors } };
        }
        var _b = args || {}, name = _b.name, email = _b.email, password = _b.password;
        return selectors_1.findUserByEmail({ email: email })
            .then(function (existingUser) { return __awaiter(_this, void 0, void 0, function () {
            var salt, newUser, _a, _id, name_1, email_1, token, errors_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(existingUser === null || existingUser === void 0 ? void 0 : existingUser.email)) return [3 /*break*/, 1];
                        return [2 /*return*/, {
                                status: { code: 409 },
                                node: {
                                    errors: {
                                        email: "Email: " + email + " already exists.",
                                    },
                                },
                            }];
                    case 1:
                        salt = password_1.saltPassword();
                        newUser = new user_1.User({
                            name: name,
                            email: email,
                            hash: password_1.hashPassword({ password: password, salt: salt }),
                            salt: salt,
                        });
                        newUser.token = newUser._id ? token_1.createToken({ _id: newUser._id, name: name }) : '';
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, newUser.save()];
                    case 3:
                        _a = _b.sent(), _id = _a._id, name_1 = _a.name, email_1 = _a.email, token = _a.token;
                        return [2 /*return*/, {
                                status: { code: 200 },
                                node: { user: { _id: _id, name: name_1, email: email_1, token: token } },
                            }];
                    case 4:
                        errors_1 = _b.sent();
                        return [2 /*return*/, { status: { code: 500 }, node: { errors: errors_1 } }];
                    case 5: return [2 /*return*/];
                }
            });
        }); })
            .catch(function (error) { return ({ status: { code: 404, error: error } }); });
    },
};
