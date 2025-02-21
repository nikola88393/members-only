const pool = require("../db/pool");
const queries = require("../db/queries");

module.exports = {
  getAll: async (req, res, next) => {
    const { user } = req;

    try {
      const posts = await queries.getAll();

      res.render("home", { user, posts });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  createPost: async (req, res, next) => {
    const { title, text } = req.body;
    console.log(req.user);

    try {
      await queries.createPost(req.user, title, text);

      res.redirect("/");
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  deletePost: async (req, res, next) => {
    const { id } = req.params;

    try {
      await queries.deletePost(id);

      res.redirect("/");
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
};
