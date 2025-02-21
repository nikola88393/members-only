const { Router } = require("express");
const router = Router();
const controller = require("../controllers/usersController");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", controller.login);

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", controller.register);

router.get("/logout", controller.logout);
router.get("/login-failure", (req, res) => {
  res.send("<h1>Error<h1/><p>Error during login</p>");
});

router.use((err, res, req, next) => {
  console.log(err);
});

module.exports = router;
