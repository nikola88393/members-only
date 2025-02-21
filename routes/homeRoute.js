const controller = require("../controllers/postsController");
const { Router } = require("express");
const router = Router();
const { isAuth, isAdmin } = require("../lib/authMiddleware");

router.get("/", controller.getAll);
router.get("/post", isAuth, (req, res, next) => {
  res.render("createPost");
});
router.post("/post", isAuth, controller.createPost);
router.post("/delete/:id", isAdmin, controller.deletePost);

router.use((err, req, res, next) => {
  console.log(err);
  res.json({ err: "Unexpected error in posts router" });
});

module.exports = router;
