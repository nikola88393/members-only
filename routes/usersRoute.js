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
  res.render("register", { err: null });
});

router.post("/register", controller.register);

router.get("/logout", controller.logout);

router.use((err, res, req, next) => {
  console.log(err);
});

module.exports = router;
