const queries = require("../db/queries");
const { generatePassword } = require("../lib/passwordUtils");
const passport = require("passport");

module.exports = {
  register: async (req, res, next) => {
    const { username, password, confirmPassword, isadmin } = req.body;

    console.log(isadmin);
    console.log(password);
    console.log(confirmPassword);
    if (confirmPassword !== password) {
      console.log("executed 1");
      res.render("register", { err: "Passwords do not match!" });
    }

    if (!username || !password) {
      console.log("executed 2");
      res.render("register", { err: "Password and username are required" });
    }

    const { hash, salt } = generatePassword(password);
    try {
      await queries.createUser(
        username,
        hash,
        salt,
        isadmin ? true : false,
        isadmin ? true : false
      );

      res.redirect("/");
    } catch (err) {
      next(err);
    }
  },

  login: passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/",
    // failWithError: true,
    failureMessage: true,
  }),

  logout: (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
    });
    res.redirect("/");
  },

  membership: async (req, res, next) => {
    const id = req.user.id;
    const { pass } = req.body;
    console.log(pass);
    if (pass !== process.env.MEMBER_SECRET) {
      res.render("membership", { err: "Wrong secret!" });
    }

    try {
      await queries.grantMemebrship(id);

      res.redirect("/");
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
};
