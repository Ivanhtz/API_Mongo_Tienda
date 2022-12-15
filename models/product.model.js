const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  description: String,
  department: String,
  price: Number,
  available: Boolean,
  stock: Number,
});

module.exports = mongoose.model("product", productSchema);
