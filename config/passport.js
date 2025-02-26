const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { getUserByUsername, getUserById } = require("../db/queries");
const { validatePassword } = require("../lib/passwordUtils");

const verifyCb = async (username, password, done) => {
  try {
    const user = await getUserByUsername(username);

    if (!user) {
      return done(null, false, {
        message: "User with this username does not exist",
      });
      // return done(new Error("User with this username does not exist"));
    }

    const isValid = validatePassword(password, user.hash, user.salt);

    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Password is incorrect" });
      // return done(new Error("Password is incorrect"));
    }
  } catch (err) {
    console.log(err);
    done(err);
  }
};

const strategy = new LocalStrategy(verifyCb);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await getUserById(userId);
    console.log("user: ", user);
    done(null, user);
  } catch (err) {
    console.log(err);
    done(err);
  }
});
