const pool = require("./pool");

const getAll = async () => {
  const query =
    "SELECT posts.id, title, text, username FROM posts JOIN users ON posts.author=users.id;";

  const { rows } = await pool.query(query);

  return rows;
};

const createPost = async (user, title, text) => {
  const id = user.id;

  const query = "INSERT INTO posts(title, text, author) VALUES ($1, $2, $3);";

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

const createUser = async (username, hash, salt, ismember, isadmin) => {
  const query =
    "INSERT INTO users(username, hash, salt,ismember, isadmin) VALUES ($1,$2,$3,$4,$5);";

  await pool.query(query, [username, hash, salt, ismember, isadmin]);
};

const grantMemebrship = async (id) => {
  const query = "UPDATE users SET ismember=true WHERE id=$1";

  await pool.query(query, [id]);
};

module.exports = {
  getAll,
  createPost,
  deletePost,
  getUserByUsername,
  getUserById,
  createUser,
  grantMemebrship,
};
