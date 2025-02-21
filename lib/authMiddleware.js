module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ msg: "You are unaouthorized to view this page" });
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isadmin) {
    next();
  } else {
    res.status(401).json({ msg: "You are not a admin" });
  }
};
