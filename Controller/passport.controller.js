const passport = require("passport");
const User = require("../Model/user.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleKey.clientID,
      clientSecret: keys.googleKey.clientSecret,
      callbackURL: keys.googleKey.callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          const newUser = new User({
            UserMail: profile.emails[0].value,
            GoogleDisplayName: profile.displayName,
            googleId: profile.id,
          });
          console.log(newUser);
          user = await newUser.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
