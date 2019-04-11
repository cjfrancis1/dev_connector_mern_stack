import passport from "passport";
import passportJwt from "passport-jwt";
import User from "..//models/User.model";
const secretOrKey = require("./keys").secretOrKey;

const opts: passportJwt.StrategyOptions = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey
};

const passportConfig = (passport: passport.PassportStatic) => {
  passport.use(
    new passportJwt.Strategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(undefined, user);
          } else {
            return done(undefined, false);
          }
        })
        .catch(err => {
          console.error(err);
        });
    })
  );
};

export default passportConfig;
