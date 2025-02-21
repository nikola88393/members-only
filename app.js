const express = require("express");
const passport = require("passport");
const expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);
const pool = require("./db/pool");
const path = require("path");
const { generatePassword } = require("./lib/passwordUtils");
const { createUser } = require("./db/queries");
const { isAuth } = require("./lib/authMiddleware");

require("./config/passport");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  expressSession({
    store: new pgSession({
      pool: pool, // Connection pool
      tableName: "user_sessions", // Use another table-name than the default "session" one
      createTableIfMissing: "user_sessions",
      // Insert connect-pg-simple options here
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    // Insert express-session options here
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-failure",
    successRedirect: "/login-success",
  })
);

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.json("Password and username are required");
  }

  const { hash, salt } = generatePassword(password);
  try {
    await createUser(username, hash, salt, false);

    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.get("/protected-route", isAuth, (req, res) => {
  res.send("<p>You are authenticated</p>");
});

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  res.redirect("/protected-route");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
