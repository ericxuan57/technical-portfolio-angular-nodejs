const jwt = require("jsonwebtoken");

exports.generateAccessToken = (user) => {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "20d" });
};

exports.verifyAccessToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) reject(err);
      resolve(user);
    });
  });
};
