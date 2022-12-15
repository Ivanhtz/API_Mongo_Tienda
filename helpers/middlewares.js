// Esto es un middleware para controlar y proteger las rutas

const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const checkToken = async (req, res, next) => {
  // 1 - Si el token viene incluido en la cabecera
  if (!req.headers["authorization"]) {
    return res.json({ error: "No has incluido la cabecera" });
  }

  //2 - Comprobar si el token funciona
  const { authorization: token } = req.headers;
  let obj;
  try {
    obj = jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    return res.json({ error: "El token no es correcto" });
  }

  //! RECUPERAR EL USUARIO QUE HA REALIZADO EL LOGIN
  const user = await User.findById(obj.userId);

  req.user = user;

  next();
};

module.exports = { checkToken };
