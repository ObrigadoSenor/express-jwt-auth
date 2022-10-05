"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
var mongoose_1 = require("mongoose");
var passport_jwt_1 = require("passport-jwt");
var User = mongoose_1.model("User");
module.exports = function (passport) {
    passport.use(new passport_jwt_1.Strategy({
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "secret",
    }, function (jwt_payload, done) {
        User.findById(jwt_payload.id)
            .then(function (user) {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        })
            .catch(function (err) { return console.log(err); });
    }));
};
