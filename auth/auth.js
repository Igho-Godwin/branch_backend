const passport = require("passport");
const ExtractJWT = require("passport-jwt").ExtractJwt;
const JWTstrategy = require("passport-jwt").Strategy;

passport.use(
  new JWTstrategy(
    {
      secretOrKey: "TOP_SECRET",
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.agent);
      } catch (error) {
        done(error);
      }
    }
  )
);
