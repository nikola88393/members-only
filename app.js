const express = require("express");
const passport = require("passport");
const expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);
const pool = require("./db/pool");
const path = require("path");
const postsRouter = require("./routes/homeRoute");
const usersRouter = require("./routes/usersRoute");

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

app.use("/", postsRouter);
app.use("/", usersRouter);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
