/* eslint-disable @typescript-eslint/no-explicit-any */
import { model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";

const User = model("User");

module.exports = (passport: any) => {
  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "secret",
      },
      (jwt_payload, done) => {
        User.findById(jwt_payload.id)
          .then((user: any) => {
            if (user) {
              return done(null, user);
            }
            return done(null, false);
          })
          .catch((err: any) => console.log(err));
      }
    )
  );
};
