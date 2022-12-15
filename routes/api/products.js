const router = require("express").Router();
const Product = require("../../models/product.model");

//! Pedimos todos los productos
router.get("/", (req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.json(err));
});

//! Pedimos un producto por id
router.get("/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);

    if (!product) res.json({ error: "No existe el producto" });

    res.json(product);
  } catch (error) {
    res.json({ error: "No existe el producto" });
  }
});

//! Obtener los productos por departamento
router.get("/dpto/:department", async (req, res) => {
  const { department } = req.params;

  try {
    const products = await Product.find({ department: department });
    res.json(products);
  } catch (err) {
    res.json({ error: err.message });
  }
});

//! Obtener los productos cuando el precio sea MAYOR que...
router.get("/pr/:minPrice", async (req, res) => {
  const { minPrice } = req.params;

  try {
    const products = await Product.find({ price: { $gt: minPrice } });
    res.json(products);
  } catch (err) {
    res.json({ error: err.message });
  }
});

//! Registro de productos
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.json({ error: err.message });
  }
});

//! Modificación del producto
router.put("/:productId", async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
  });
  res.json(product);
});

//! Borrado del producto
router.delete("/:productId", async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findByIdAndDelete(productId);
  res.json(product);
});

module.exports = router;
