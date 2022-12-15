const router = require("express").Router();
const { checkToken } = require("../helpers/middlewares");

const apiProductsRouter = require("./api/products");
const apiUsersRouter = require("./api/users");

router.use("/products", checkToken, apiProductsRouter); // metemos el middleware checktoken
router.use("/users", apiUsersRouter);

module.exports = router;
