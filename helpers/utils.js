const jwt = require("jsonwebtoken");

// Metemos el usuario y con su id y su rol creamos un token (librería jsonwebtoken)
const createToken = (user) => {
  const obj = {
    userId: user._id,
    role: user.role,
  };

  return jwt.sign(obj, process.env.SECRET_KEY);
};

module.exports = { createToken };
