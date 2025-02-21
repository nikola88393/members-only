const pool = require("./pool");

const getAll = async () => {
  const query = "SELECT * FROM posts JOIN users ON posts.author=users.id;";

  const { rows } = await pool.query(query);

  return rows;
};

const createPost = async (user, title, text) => {
  const id = user.id;

  const query = "INSERT INTO posts(title, text, authorId) VALUES ($1, $2, $3);";

  await pool.query(query, [title, text, id]);
};

const deletePost = async (id) => {
  const query = "DELETE FROM posts WHERE id=$1;";

  await pool.query(query, [id]);
};

const getUserByUsername = async (username) => {
  const query = "SELECT * FROM users WHERE username=$1;";

  const { rows } = await pool.query(query, [username]);

  return rows[0];
};

const getUserById = async (id) => {
  const query = "SELECT * FROM users WHERE id=$1;";

  const { rows } = await pool.query(query, [id]);

  return rows[0];
};

const createUser = async (username, hash, salt, isadmin) => {
  const query =
    "INSERT INTO users(username, hash, salt, isadmin) VALUES ($1,$2,$3,$4);";

  await pool.query(query, [username, hash, salt, isadmin]);
};

module.exports = {
  getAll,
  createPost,
  deletePost,
  getUserByUsername,
  getUserById,
  createUser,
};
