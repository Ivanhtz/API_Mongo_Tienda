const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    minLength: [3, "El nombre debe tener como mínimo 3 caracteres"],
  },
  email: String,
  password: String,
  active: Boolean,
  role: { type: String, default: "regular" },
});

module.exports = mongoose.model("user", userSchema);
