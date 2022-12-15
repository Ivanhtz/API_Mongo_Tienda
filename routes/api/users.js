const router = require("express").Router();
const User = require("../../models/user.model");
const bcrypt = require("bcryptjs"); // encripta password
const { createToken } = require("../../helpers/utils");
const { checkToken } = require("../../helpers/middlewares");

// Controla el perfil de los usuarios, le metemos el middleware del token para asegurarnos que esta registrado
router.get("/profile", checkToken, (req, res) => {
  const user = { ...req.user._doc };

  delete user.password;

  res.json(user);
});

// Registra usuarios con password encriptada
router.post("/register", async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 9);

  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// Controla el acceso por el login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // miro si el email existe en la base de datos
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.json({ error: "Error email y/o contraseña" });
  }

  // Comprobar que las password coincidan
  const equals = bcrypt.compareSync(password, user.password);
  if (!equals) {
    return res.json({ error: "Error email y/o contraseña" });
  }

  // Le mandamos el mensaje y un token
  res.json({ success: "Login correcto", token: createToken(user) });
});

module.exports = router;
