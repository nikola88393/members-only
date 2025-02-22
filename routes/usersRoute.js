const { Router } = require("express");
const router = Router();
const controller = require("../controllers/usersController");

router.get("/login", (req, res) => {
  const error = req.session.messages?.[0]; // Store the message
  req.session.messages = []; // Clear it BEFORE rendering
  console.log(req.session.messages);
  res.render("login", { err: error }); // Render with the cleared session
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
