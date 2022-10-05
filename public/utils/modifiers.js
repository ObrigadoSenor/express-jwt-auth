"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordUser = exports.renameUser = exports.deleteUser = void 0;
var index_1 = require("./../models/user/index");
var deleteUser = function (_a) {
    var email = _a.email, _id = _a._id;
    return index_1.User.deleteOne({ email: email, _id: _id })
        .then(function (data) {
        console.log("Successful deletion", data);
        return data;
    })
        .catch(function (err) { return console.log(err); });
};
exports.deleteUser = deleteUser;
var renameUser = function (_a) {
    var name = _a.name, _id = _a._id;
    return index_1.User.updateOne({ _id: _id }, { $set: { name: name } })
        .then(function (data) {
        console.log("Successful renaming", data);
        return data;
    })
        .catch(function (err) { return console.log(err); });
};
exports.renameUser = renameUser;
var changePasswordUser = function (_a) {
    var hash = _a.hash, salt = _a.salt, _id = _a._id;
    return index_1.User.updateOne({ _id: _id }, { $set: { hash: hash, salt: salt } })
        .then(function (data) {
        console.log("Successful changed password", data);
        return data;
    })
        .catch(function (err) { return console.log(err); });
};
exports.changePasswordUser = changePasswordUser;
