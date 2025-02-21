const queries = require("../db/queries");
const { generatePassword } = require("../lib/passwordUtils");
const passport = require("passport");

module.exports = {
  register: async (req, res, next) => {
    const { username, password, isadmin } = req.body;

    console.log(isadmin);

    if (!username || !password) {
      res.json("Password and username are required");
    }

    const { hash, salt } = generatePassword(password);
    try {
      await queries.createUser(username, hash, salt, isadmin ? true : false);

      res.redirect("/");
    } catch (err) {
      next(err);
    }
  },

  login: passport.authenticate("local", {
    failureRedirect: "/login-failure",
    successRedirect: "/",
  }),

  logout: (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
    });
    res.redirect("/");
  },
};
